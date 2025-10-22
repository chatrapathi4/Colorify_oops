import React, { useState, useEffect, useRef } from 'react';
import './HexFinder.css';

const HexFinder = () => {
  const [hexInput, setHexInput] = useState('#3B82F6');
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [rgbInput, setRgbInput] = useState({ r: 59, g: 130, b: 246 });
  const [palette, setPalette] = useState([]);
  const [validationMessage, setValidationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Image processing states
  const [extractedColors, setExtractedColors] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [cameraReady, setCameraReady] = useState(false);
  
  // New states for pointer functionality
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [pointerColor, setPointerColor] = useState('#000000');
  const [showPointer, setShowPointer] = useState(false);
  const [currentImageFile, setCurrentImageFile] = useState(null);
  
  // Refs
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const imageRef = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/api/hex`
    : 'http://localhost:8080/api/hex';
  const IMAGE_API_BASE_URL = process.env.REACT_APP_IMAGE_API_URL
    ? `${process.env.REACT_APP_IMAGE_API_URL}/api/image`
    : 'http://localhost:8080/api/image';

  // Color functions
  const generateRandomColor = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/random`);
      const data = await response.json();
      
      if (data.hex && data.rgb) {
        setCurrentColor(data.hex);
        setHexInput(data.hex);
        setRgbInput(data.rgb);
        setValidationMessage('Random color generated!');
      }
    } catch (error) {
      console.error('Error generating random color:', error);
      setValidationMessage('Error generating random color');
    }
    setIsLoading(false);
  };

  const validateHex = async (hex) => {
    if (!hex) return;
    
    try {
      const cleanHex = hex.startsWith('#') ? hex.substring(1) : hex;
      const response = await fetch(`${API_BASE_URL}/validate/${cleanHex}`);
      const data = await response.json();
      
      if (data.valid) {
        setCurrentColor(data.hex);
        setHexInput(data.hex);
        setRgbInput(data.rgb);
        setValidationMessage('Valid HEX color!');
      } else {
        setValidationMessage(data.message || 'Invalid HEX color format');
      }
    } catch (error) {
      console.error('Error validating color:', error);
      setValidationMessage('Error validating color');
    }
  };

  const convertRgbToHex = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rgbInput),
      });
      const data = await response.json();
      
      if (data.hex && data.rgb) {
        setCurrentColor(data.hex);
        setHexInput(data.hex);
        setRgbInput(data.rgb);
        setValidationMessage('RGB converted to HEX!');
      } else {
        setValidationMessage(data.error || 'Error converting RGB');
      }
    } catch (error) {
      console.error('Error converting RGB:', error);
      setValidationMessage('Error converting RGB to HEX');
    }
    setIsLoading(false);
  };

  const generatePalette = async () => {
    if (!currentColor) return;
    
    setIsLoading(true);
    try {
      const cleanHex = currentColor.startsWith('#') ? currentColor.substring(1) : currentColor;
      const response = await fetch(`${API_BASE_URL}/palette/${cleanHex}`);
      const data = await response.json();
      
      if (data.palette) {
        setPalette(data.palette);
        setValidationMessage('Palette generated!');
      } else {
        setValidationMessage(data.error || 'Error generating palette');
      }
    } catch (error) {
      console.error('Error generating palette:', error);
      setValidationMessage('Error generating palette');
    }
    setIsLoading(false);
  };

  // Image processing functions
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = async (file) => {
    setIsLoading(true);
    setCurrentImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setShowPointer(true);
    };
    reader.readAsDataURL(file);

    // Extract colors with improved accuracy
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('sampleRate', '5');
      formData.append('colorCount', '15');
      formData.append('minFrequency', '0.01');

      const response = await fetch(`${IMAGE_API_BASE_URL}/extract-colors`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.colors && data.colors.length > 0) {
        setExtractedColors(data.colors);
        setValidationMessage(`Extracted ${data.colors.length} dominant colors from image!`);
        
        // Automatically set the most dominant color
        const dominantColor = data.colors[0];
        setCurrentColor(dominantColor.hex);
        setHexInput(dominantColor.hex);
        setRgbInput(dominantColor.rgb);
      } else {
        setValidationMessage(data.error || 'No colors could be extracted from this image');
      }
    } catch (error) {
      console.error('Error processing image:', error);
      setValidationMessage('Error processing image');
    }
    
    setIsLoading(false);
  };

  // Color point analysis
  const getColorAtPoint = async (x, y) => {
    if (!currentImageFile) return '#000000';

    try {
      const formData = new FormData();
      formData.append('image', currentImageFile);
      formData.append('x', Math.round(x));
      formData.append('y', Math.round(y));

      const response = await fetch(`${IMAGE_API_BASE_URL}/analyze-color-at-point`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.color) {
        setPointerColor(data.color.hex);
        return data.color.hex;
      }
    } catch (error) {
      console.error('Error getting color at point:', error);
    }
    return '#000000';
  };

  // Image interaction handlers
  const handleImageMouseMove = async (e) => {
    if (!showPointer || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageRef.current.naturalWidth / rect.width;
    const scaleY = imageRef.current.naturalHeight / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    setPointerPosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
    
    await getColorAtPoint(x, y);
  };

  const handleImageClick = async (e) => {
    if (!showPointer || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageRef.current.naturalWidth / rect.width;
    const scaleY = imageRef.current.naturalHeight / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const color = await getColorAtPoint(x, y);
    if (color && color !== '#000000') {
      setCurrentColor(color);
      setHexInput(color);
      
      // Convert hex to RGB
      const r = parseInt(color.substring(1, 3), 16);
      const g = parseInt(color.substring(3, 5), 16);
      const b = parseInt(color.substring(5, 7), 16);
      setRgbInput({ r, g, b });
      
      setValidationMessage(`Selected color ${color} from image point!`);
    }
  };

  // Camera functions
  const openCamera = async () => {
    setCameraError('');
    setCameraReady(false);
    setIsCameraOpen(true);
    setValidationMessage('Requesting camera access...');
    
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        },
        audio: false
      });

      streamRef.current = stream;
      setValidationMessage('Camera access granted, setting up video...');

      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          const handleVideoReady = () => {
            setCameraReady(true);
            setValidationMessage('Camera ready! Click capture to take a photo.');
          };

          const handleVideoError = (error) => {
            console.error('Video error:', error);
            setCameraError('Error loading video stream');
            closeCamera();
          };

          videoRef.current.removeEventListener('loadedmetadata', handleVideoReady);
          videoRef.current.removeEventListener('canplay', handleVideoReady);
          videoRef.current.removeEventListener('error', handleVideoError);
          
          videoRef.current.addEventListener('loadedmetadata', handleVideoReady);
          videoRef.current.addEventListener('canplay', handleVideoReady);
          videoRef.current.addEventListener('error', handleVideoError);
        }
      });

    } catch (error) {
      console.error('Camera error:', error);
      setCameraError(`Camera access denied: ${error.message}`);
      setIsCameraOpen(false);
      setValidationMessage('');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      processImageFile(file);
      closeCamera();
    }, 'image/jpeg', 0.8);
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
    setCameraReady(false);
    setValidationMessage('Camera closed');
  };

  // Utility functions
  const selectColorFromExtracted = (color) => {
    setCurrentColor(color.hex);
    setHexInput(color.hex);
    setRgbInput(color.rgb);
    setValidationMessage(`Selected color ${color.hex} from image!`);
  };

  const clearImage = () => {
    setImagePreview(null);
    setExtractedColors([]);
    setShowPointer(false);
    setCurrentImageFile(null);
    setPointerColor('#000000');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setValidationMessage('Image cleared');
  };

  const handleHexInputChange = (e) => {
    const value = e.target.value;
    setHexInput(value);
    
    // Auto-validate and update color display as user types
    if (value.length >= 6) {
      const hexPattern = /^#?[0-9A-Fa-f]{6}$/;
      if (hexPattern.test(value)) {
        const formattedHex = value.startsWith('#') ? value : `#${value}`;
        setCurrentColor(formattedHex);
        
        // Convert to RGB
        const r = parseInt(formattedHex.substring(1, 3), 16);
        const g = parseInt(formattedHex.substring(3, 5), 16);
        const b = parseInt(formattedHex.substring(5, 7), 16);
        setRgbInput({ r, g, b });
      }
    }
  };

  const handleRgbInputChange = (color, value) => {
    const numValue = Math.min(255, Math.max(0, parseInt(value) || 0));
    const newRgb = { ...rgbInput, [color]: numValue };
    setRgbInput(newRgb);
    
    // Auto-convert to HEX and update color display
    const hex = `#${newRgb.r.toString(16).padStart(2, '0')}${newRgb.g.toString(16).padStart(2, '0')}${newRgb.b.toString(16).padStart(2, '0')}`.toUpperCase();
    setCurrentColor(hex);
    setHexInput(hex);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setValidationMessage(`Copied ${color} to clipboard!`);
  };

  useEffect(() => {
    generateRandomColor();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="hex-finder">
      <div className="hex-finder-container">
        <h1 className="hex-finder-title">HEX Color Finder</h1>
        
        {/* Color Display - Fixed with inline styles as fallback */}
        <div className="color-display" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div 
            className="color-preview"
            style={{ 
              backgroundColor: currentColor,
              width: '200px',
              height: '200px',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              border: '4px solid white'
            }}
            onClick={() => copyToClipboard(currentColor)}
            title="Click to copy"
          >
            <span 
              className="color-text"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#1f2937',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '1.1rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              {currentColor}
            </span>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="input-section">
          <label className="input-label">Extract Colors from Image</label>
          <div className="image-upload-container">
            <div className="upload-buttons">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden-file-input"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="btn btn-secondary">
                📁 Upload Image
              </label>
              <button 
                onClick={openCamera}
                className="btn btn-secondary"
                disabled={isCameraOpen}
              >
                📷 Open Camera
              </button>
              {(imagePreview || extractedColors.length > 0) && (
                <button 
                  onClick={clearImage}
                  className="btn btn-danger"
                >
                  🗑️ Clear
                </button>
              )}
            </div>
            
            {/* Image Preview with Pointer */}
            {imagePreview && (
              <div className="image-preview">
                <div className="image-container">
                  <img 
                    ref={imageRef}
                    src={imagePreview} 
                    alt="Uploaded" 
                    className="preview-image"
                    onMouseMove={handleImageMouseMove}
                    onClick={handleImageClick}
                  />
                  {showPointer && (
                    <div 
                      className="color-pointer"
                      style={{
                        left: pointerPosition.x,
                        top: pointerPosition.y,
                      }}
                    >
                      <div className="pointer-dot"></div>
                      <div className="pointer-tooltip">
                        <div 
                          className="pointer-color-preview"
                          style={{ backgroundColor: pointerColor }}
                        ></div>
                        <span className="pointer-hex">{pointerColor}</span>
                      </div>
                    </div>
                  )}
                </div>
                {showPointer && (
                  <div className="pointer-instructions">
                    <span>🖱️ Move mouse to see colors | 🖱️ Click to select color</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Camera Section */}
            {isCameraOpen && (
              <div className="camera-section">
                <div className="camera-container">
                  <div className="camera-box">
                    <video 
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="camera-video"
                    />
                  </div>
                  <div className="camera-controls">
                    <button 
                      onClick={capturePhoto}
                      className="btn btn-primary"
                      disabled={!cameraReady}
                    >
                      📸 Capture Photo
                    </button>
                    <button 
                      onClick={closeCamera}
                      className="btn btn-danger"
                    >
                      ✕ Close Camera
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <canvas ref={canvasRef} className="hidden-canvas" />
          </div>
        </div>

        {/* Camera Error Display */}
        {cameraError && (
          <div className="input-section">
            <div className="camera-error-section">
              <h3>Camera Troubleshooting</h3>
              <p>{cameraError}</p>
              <div className="troubleshooting-steps">
                <h4>Try these steps:</h4>
                <ul>
                  <li>🔒 Click the camera icon in your browser's address bar and allow camera access</li>
                  <li>🔄 Refresh the page and try again</li>
                  <li>📱 Make sure no other app is using your camera</li>
                  <li>🌐 Use HTTPS or localhost (some browsers require secure connection)</li>
                  <li>🔧 Check your browser settings for camera permissions</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Colors */}
        {extractedColors.length > 0 && (
          <div className="input-section">
            <label className="input-label">Extracted Colors from Image</label>
            <div className="extracted-colors-grid">
              {extractedColors.map((color, index) => (
                <div 
                  key={index}
                  className="extracted-color"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => selectColorFromExtracted(color)}
                  title={`${color.hex} - ${color.percentage || 'Click to use'}`}
                >
                  <div className="extracted-color-info">
                    <span className="extracted-color-hex">{color.hex}</span>
                    {color.percentage && (
                      <span className="extracted-color-percentage">{color.percentage}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HEX Input */}
        <div className="input-section">
          <label className="input-label">HEX Color</label>
          <div className="input-group">
            <input
              type="text"
              value={hexInput}
              onChange={handleHexInputChange}
              placeholder="#FFFFFF"
              className="hex-input"
              maxLength="7"
            />
            <button 
              onClick={() => validateHex(hexInput)}
              className="btn btn-primary"
              disabled={isLoading}
            >
              Validate
            </button>
          </div>
        </div>

        {/* RGB Input */}
        <div className="input-section">
          <label className="input-label">RGB Values</label>
          <div className="rgb-inputs">
            <div className="rgb-input-group">
              <label>R</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgbInput.r}
                onChange={(e) => handleRgbInputChange('r', e.target.value)}
                className="rgb-input"
              />
            </div>
            <div className="rgb-input-group">
              <label>G</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgbInput.g}
                onChange={(e) => handleRgbInputChange('g', e.target.value)}
                className="rgb-input"
              />
            </div>
            <div className="rgb-input-group">
              <label>B</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgbInput.b}
                onChange={(e) => handleRgbInputChange('b', e.target.value)}
                className="rgb-input"
              />
            </div>
            <button 
              onClick={convertRgbToHex}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Convert
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={generateRandomColor}
            className="btn btn-accent"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Random Color'}
          </button>
          <button 
            onClick={generatePalette}
            className="btn btn-accent"
            disabled={isLoading}
          >
            Generate Palette
          </button>
        </div>

        {/* Validation Message */}
        {validationMessage && (
          <div className="validation-message">
            {validationMessage}
          </div>
        )}

        {/* Generated Palette */}
        {palette.length > 0 && (
          <div className="palette-section">
            <h3>Generated Palette</h3>
            <div className="palette-grid">
              {palette.map((color, index) => (
                <div 
                  key={index}
                  className="palette-color"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => {
                    setCurrentColor(color.hex);
                    setHexInput(color.hex);
                    setRgbInput(color.rgb);
                    copyToClipboard(color.hex);
                  }}
                  title={`${color.hex} - Click to select and copy`}
                >
                  <span className="palette-color-text">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HexFinder;