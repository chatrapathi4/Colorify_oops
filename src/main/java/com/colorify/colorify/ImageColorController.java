package com.colorify.colorify;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.awt.image.BufferedImage;
import java.awt.Color;
import javax.imageio.ImageIO;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageColorController {

    @PostMapping("/extract-colors")
    public Map<String, Object> extractColorsFromImage(
            @RequestParam("image") MultipartFile file,
            @RequestParam(value = "sampleRate", defaultValue = "10") int sampleRate,
            @RequestParam(value = "colorCount", defaultValue = "10") int colorCount,
            @RequestParam(value = "minFrequency", defaultValue = "0.02") double minFrequency) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (file.isEmpty()) {
                response.put("error", "No image file provided");
                return response;
            }

            BufferedImage image = ImageIO.read(file.getInputStream());
            if (image == null) {
                response.put("error", "Invalid image format");
                return response;
            }

            List<Map<String, Object>> extractedColors = extractDominantColorsImproved(image, sampleRate, colorCount, minFrequency);
            response.put("colors", extractedColors);
            response.put("imageInfo", getImageInfo(image));
            response.put("message", "Colors extracted successfully");

        } catch (IOException e) {
            response.put("error", "Error processing image: " + e.getMessage());
        } catch (Exception e) {
            response.put("error", "Unexpected error: " + e.getMessage());
        }

        return response;
    }

    @PostMapping("/analyze-color-at-point")
    public Map<String, Object> analyzeColorAtPoint(
            @RequestParam("image") MultipartFile file,
            @RequestParam("x") int x,
            @RequestParam("y") int y) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            BufferedImage image = ImageIO.read(file.getInputStream());
            if (image == null) {
                response.put("error", "Invalid image format");
                return response;
            }

            if (x >= 0 && x < image.getWidth() && y >= 0 && y < image.getHeight()) {
                // Get average color from a 3x3 area around the point for more accuracy
                Color avgColor = getAverageColorAroundPoint(image, x, y, 2);
                
                String hexColor = String.format("#%02X%02X%02X", 
                    avgColor.getRed(), avgColor.getGreen(), avgColor.getBlue());
                
                Map<String, Object> colorInfo = new HashMap<>();
                colorInfo.put("hex", hexColor);
                colorInfo.put("rgb", Map.of(
                    "r", avgColor.getRed(),
                    "g", avgColor.getGreen(),
                    "b", avgColor.getBlue()
                ));
                colorInfo.put("position", Map.of("x", x, "y", y));
                
                response.put("color", colorInfo);
                response.put("message", "Color extracted at point (" + x + ", " + y + ")");
            } else {
                response.put("error", "Coordinates out of image bounds");
            }

        } catch (Exception e) {
            response.put("error", "Error analyzing image: " + e.getMessage());
        }
        
        return response;
    }

    private List<Map<String, Object>> extractDominantColorsImproved(BufferedImage image, int sampleRate, int maxColors, double minFrequency) {
        Map<String, ColorData> colorCount = new HashMap<>();
        
        // Adaptive sampling based on image size
        int width = image.getWidth();
        int height = image.getHeight();
        int step = Math.max(1, Math.min(width, height) / sampleRate);
        
        // First pass: collect all colors with improved quantization
        int sampledPixels = 0;
        for (int x = 0; x < width; x += step) {
            for (int y = 0; y < height; y += step) {
                int rgb = image.getRGB(x, y);
                Color color = new Color(rgb);
                
                // Skip very transparent pixels
                int alpha = (rgb >> 24) & 0xFF;
                if (alpha < 128) continue;
                
                // Improved color quantization with perceptual grouping
                String hexColor = quantizeColorImproved(color);
                
                ColorData data = colorCount.getOrDefault(hexColor, new ColorData(hexColor));
                data.frequency++;
                data.addColor(color);
                colorCount.put(hexColor, data);
                sampledPixels++;
            }
        }
        final int totalPixels = sampledPixels;

        // Filter out colors below minimum frequency
        colorCount = colorCount.entrySet().stream()
                .filter(entry -> (double) entry.getValue().frequency / totalPixels >= minFrequency)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        // Sort by frequency and return top colors
        List<ColorData> sortedColors = colorCount.values()
                .stream()
                .sorted((a, b) -> Integer.compare(b.frequency, a.frequency))
                .limit(maxColors)
                .collect(Collectors.toList());

        List<Map<String, Object>> dominantColors = new ArrayList<>();
        for (ColorData colorData : sortedColors) {
            Color avgColor = colorData.getAverageColor();
            String finalHex = String.format("#%02X%02X%02X", 
                avgColor.getRed(), avgColor.getGreen(), avgColor.getBlue());
            
            Map<String, Object> colorInfo = createColorInfo(finalHex);
            colorInfo.put("frequency", (double) colorData.frequency / totalPixels);
            colorInfo.put("percentage", String.format("%.1f%%", 
                ((double) colorData.frequency / totalPixels) * 100));
            dominantColors.add(colorInfo);
        }

        return dominantColors;
    }

    private String quantizeColorImproved(Color color) {
        // Perceptual color quantization using Lab color space approximation
        int r = color.getRed();
        int g = color.getGreen();
        int b = color.getBlue();
        
        // Convert to approximate perceptual space and quantize
        // This groups visually similar colors together better
        double luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Adaptive quantization based on luminance
        int quantLevel = luminance > 128 ? 32 : 24; // Finer quantization for brighter colors
        
        int qr = (r / quantLevel) * quantLevel;
        int qg = (g / quantLevel) * quantLevel;
        int qb = (b / quantLevel) * quantLevel;
        
        return String.format("#%02X%02X%02X", qr, qg, qb);
    }

    private Color getAverageColorAroundPoint(BufferedImage image, int centerX, int centerY, int radius) {
        int totalR = 0, totalG = 0, totalB = 0;
        int count = 0;
        
        int startX = Math.max(0, centerX - radius);
        int endX = Math.min(image.getWidth() - 1, centerX + radius);
        int startY = Math.max(0, centerY - radius);
        int endY = Math.min(image.getHeight() - 1, centerY + radius);
        
        for (int x = startX; x <= endX; x++) {
            for (int y = startY; y <= endY; y++) {
                int rgb = image.getRGB(x, y);
                Color color = new Color(rgb);
                
                totalR += color.getRed();
                totalG += color.getGreen();
                totalB += color.getBlue();
                count++;
            }
        }
        
        if (count == 0) return new Color(0, 0, 0);
        
        return new Color(
            Math.min(255, totalR / count),
            Math.min(255, totalG / count),
            Math.min(255, totalB / count)
        );
    }

    private Map<String, Object> createColorInfo(String hexColor) {
        Map<String, Object> colorInfo = new HashMap<>();
        colorInfo.put("hex", hexColor);
        
        // Convert hex to RGB
        int r = Integer.valueOf(hexColor.substring(1, 3), 16);
        int g = Integer.valueOf(hexColor.substring(3, 5), 16);
        int b = Integer.valueOf(hexColor.substring(5, 7), 16);
        
        colorInfo.put("rgb", Map.of("r", r, "g", g, "b", b));
        colorInfo.put("name", getColorName(hexColor));
        
        return colorInfo;
    }

    private Map<String, Object> getImageInfo(BufferedImage image) {
        Map<String, Object> info = new HashMap<>();
        info.put("width", image.getWidth());
        info.put("height", image.getHeight());
        info.put("type", getImageType(image.getType()));
        return info;
    }

    private String getImageType(int type) {
        return switch (type) {
            case BufferedImage.TYPE_INT_RGB -> "RGB";
            case BufferedImage.TYPE_INT_ARGB -> "ARGB";
            case BufferedImage.TYPE_BYTE_GRAY -> "Grayscale";
            default -> "Other";
        };
    }

    private String getColorName(String hex) {
        Map<String, String> colorNames = new HashMap<>();
        colorNames.put("#FF0000", "Red");
        colorNames.put("#00FF00", "Green");
        colorNames.put("#0000FF", "Blue");
        colorNames.put("#FFFF00", "Yellow");
        colorNames.put("#FF00FF", "Magenta");
        colorNames.put("#00FFFF", "Cyan");
        colorNames.put("#000000", "Black");
        colorNames.put("#FFFFFF", "White");
        colorNames.put("#808080", "Gray");
        
        return colorNames.getOrDefault(hex.toUpperCase(), "Custom Color");
    }

    // Helper class to track color data
    private static class ColorData {
        String hexColor;
        int frequency;
        List<Color> colors;
        
        public ColorData(String hexColor) {
            this.hexColor = hexColor;
            this.frequency = 0;
            this.colors = new ArrayList<>();
        }
        
        public void addColor(Color color) {
            colors.add(color);
        }
        
        public Color getAverageColor() {
            if (colors.isEmpty()) return Color.BLACK;
            
            int totalR = 0, totalG = 0, totalB = 0;
            for (Color color : colors) {
                totalR += color.getRed();
                totalG += color.getGreen();
                totalB += color.getBlue();
            }
            
            return new Color(
                totalR / colors.size(),
                totalG / colors.size(),
                totalB / colors.size()
            );
        }
    }
}