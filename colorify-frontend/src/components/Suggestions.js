import React, { useState, useEffect } from 'react';
import './Suggestions.css';

const Suggestions = () => {
  const [selectedType, setSelectedType] = useState('trends');
  const [selectedColor, setSelectedColor] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    style: 'modern',
    mood: 'calm',
    industry: 'tech'
  });

  useEffect(() => {
    loadSuggestions();
  }, [selectedType, userPreferences]);

  const suggestionTypes = [
    { id: 'trends', name: 'Color Trends', icon: '📈', description: 'Latest color trends for 2024' },
    { id: 'harmony', name: 'Color Harmony', icon: '🎨', description: 'Scientifically pleasing color combinations' },
    { id: 'psychology', name: 'Color Psychology', icon: '🧠', description: 'Colors that evoke specific emotions' },
    { id: 'accessibility', name: 'Accessibility', icon: '♿', description: 'WCAG compliant color combinations' },
    { id: 'industry', name: 'Industry Standards', icon: '🏢', description: 'Colors popular in specific industries' },
    { id: 'seasonal', name: 'Seasonal Colors', icon: '🍂', description: 'Colors for different seasons and occasions' }
  ];

  const loadSuggestions = () => {
    setIsLoading(true);
    
    // Simulate API call - in real app, this would fetch from backend
    setTimeout(() => {
      const mockSuggestions = generateMockSuggestions(selectedType, userPreferences);
      setSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 500);
  };

  const generateMockSuggestions = (type, preferences) => {
    const suggestionData = {
      trends: [
        {
          id: 1,
          title: 'Digital Lime',
          colors: ['#32FF32', '#7CFC00', '#ADFF2F', '#9AFF9A', '#98FB98'],
          description: 'Vibrant green trending in digital design for 2024',
          reason: 'Popular in tech and sustainability brands',
          confidence: 95,
          tags: ['tech', 'modern', 'fresh'],
          usage: 'Perfect for app interfaces and modern websites'
        },
        {
          id: 2,
          title: 'Cosmic Purple',
          colors: ['#6A0DAD', '#8A2BE2', '#9370DB', '#BA55D3', '#DDA0DD'],
          description: 'Deep purple gaining popularity in luxury brands',
          reason: 'Associated with innovation and premium quality',
          confidence: 88,
          tags: ['luxury', 'premium', 'innovative'],
          usage: 'Ideal for luxury products and creative agencies'
        },
        {
          id: 3,
          title: 'Warm Terracotta',
          colors: ['#E2725B', '#CD853F', '#D2691E', '#F4A460', '#DEB887'],
          description: 'Earthy terracotta tones making a comeback',
          reason: 'Trending in interior design and lifestyle brands',
          confidence: 82,
          tags: ['earthy', 'warm', 'natural'],
          usage: 'Great for lifestyle and home decor brands'
        },
        {
          id: 4,
          title: 'Neon Cyber',
          colors: ['#FF0080', '#00FF80', '#8000FF', '#FF8000', '#0080FF'],
          description: 'Bold neon colors inspired by cyberpunk aesthetics',
          reason: 'Rising trend in gaming and entertainment industries',
          confidence: 85,
          tags: ['neon', 'cyberpunk', 'bold'],
          usage: 'Perfect for gaming platforms and tech startups'
        },
        {
          id: 5,
          title: 'Sage Green Minimalism',
          colors: ['#9CAF88', '#B8C5A0', '#D4DAB8', '#F0F3E8', '#FFFFFF'],
          description: 'Soft sage green palette for minimal aesthetics',
          reason: 'Growing trend in wellness and mindfulness brands',
          confidence: 90,
          tags: ['minimal', 'calm', 'nature'],
          usage: 'Excellent for wellness apps and lifestyle brands'
        },
        {
          id: 6,
          title: 'Sunset Gradient',
          colors: ['#FF6B6B', '#FFE66D', '#FF8E53', '#FF6B9D', '#C44569'],
          description: 'Warm gradient colors inspired by golden hour',
          reason: 'Popular in social media and photography apps',
          confidence: 87,
          tags: ['warm', 'gradient', 'social'],
          usage: 'Great for photography and social media platforms'
        },
        {
          id: 7,
          title: 'Ocean Depths',
          colors: ['#0D47A1', '#1565C0', '#1976D2', '#42A5F5', '#90CAF9'],
          description: 'Deep blue gradient reminiscent of ocean depths',
          reason: 'Trending in fintech and professional services',
          confidence: 83,
          tags: ['professional', 'trust', 'depth'],
          usage: 'Perfect for financial and professional applications'
        },
        {
          id: 8,
          title: 'Pastel Rainbow',
          colors: ['#FFB3E6', '#FFCCB3', '#FFFFB3', '#CCFFB3', '#B3E6FF'],
          description: 'Soft pastel rainbow for contemporary design',
          reason: 'Rising in creative and artistic communities',
          confidence: 79,
          tags: ['pastel', 'creative', 'soft'],
          usage: 'Ideal for creative portfolios and art platforms'
        },
        {
          id: 9,
          title: 'Monochrome Gold',
          colors: ['#FFD700', '#FFC107', '#FF8F00', '#FF6F00', '#E65100'],
          description: 'Luxurious gold monochrome palette',
          reason: 'Gaining popularity in premium brand design',
          confidence: 91,
          tags: ['luxury', 'premium', 'elegant'],
          usage: 'Perfect for luxury brands and high-end services'
        },
        {
          id: 10,
          title: 'Earth Revival',
          colors: ['#8D6E63', '#A1887F', '#BCAAA4', '#D7CCC8', '#EFEBE9'],
          description: 'Natural earth tones for sustainable design',
          reason: 'Growing trend with environmental consciousness',
          confidence: 86,
          tags: ['sustainable', 'natural', 'earthy'],
          usage: 'Great for eco-friendly and sustainable brands'
        }
      ],
      harmony: [
        {
          id: 11,
          title: 'Complementary Balance',
          colors: ['#FF6B35', '#359AFF', '#FFE5D9', '#D9EFFF', '#FFFFFF'],
          description: 'Perfect complementary color relationship',
          reason: 'Creates visual tension and attracts attention',
          confidence: 100,
          tags: ['balanced', 'contrasting', 'dynamic'],
          usage: 'Excellent for call-to-action buttons and highlights'
        },
        {
          id: 12,
          title: 'Analogous Serenity',
          colors: ['#4A90E2', '#7B68EE', '#9370DB', '#C8E6C9', '#E8F5E8'],
          description: 'Harmonious blues and purples with nature accents',
          reason: 'Creates a calming and cohesive visual experience',
          confidence: 94,
          tags: ['calm', 'harmonious', 'soothing'],
          usage: 'Perfect for wellness apps and healthcare websites'
        },
        {
          id: 13,
          title: 'Triadic Energy',
          colors: ['#FF4136', '#FFDC00', '#0074D9', '#FFE6E6', '#FFF8DC'],
          description: 'Vibrant triadic color scheme for high energy',
          reason: 'Balanced contrast with maximum visual impact',
          confidence: 87,
          tags: ['energetic', 'vibrant', 'playful'],
          usage: 'Great for gaming, sports, and entertainment brands'
        },
        {
          id: 14,
          title: 'Split Complementary',
          colors: ['#FF5722', '#4CAF50', '#2196F3', '#FFCCBC', '#E8F5E8'],
          description: 'Sophisticated split complementary harmony',
          reason: 'Provides contrast while maintaining balance',
          confidence: 92,
          tags: ['sophisticated', 'balanced', 'modern'],
          usage: 'Perfect for modern web applications and UI design'
        },
        {
          id: 15,
          title: 'Tetradic Square',
          colors: ['#E91E63', '#4CAF50', '#FF9800', '#2196F3', '#F3E5F5'],
          description: 'Four-color square harmony for rich designs',
          reason: 'Offers maximum color variety while staying harmonious',
          confidence: 85,
          tags: ['rich', 'varied', 'complex'],
          usage: 'Excellent for complex interfaces and data visualization'
        },
        {
          id: 16,
          title: 'Monochromatic Blue',
          colors: ['#0D47A1', '#1976D2', '#42A5F5', '#90CAF9', '#E3F2FD'],
          description: 'Classic monochromatic blue progression',
          reason: 'Creates unity and sophistication',
          confidence: 96,
          tags: ['unified', 'professional', 'classic'],
          usage: 'Ideal for corporate and professional applications'
        },
        {
          id: 17,
          title: 'Warm Analogous',
          colors: ['#FF5722', '#FF9800', '#FFC107', '#FFEB3B', '#FFF9C4'],
          description: 'Warm analogous colors from red to yellow',
          reason: 'Creates warmth and energy while maintaining harmony',
          confidence: 89,
          tags: ['warm', 'energetic', 'friendly'],
          usage: 'Perfect for food, hospitality, and lifestyle brands'
        },
        {
          id: 18,
          title: 'Cool Analogous',
          colors: ['#2196F3', '#00BCD4', '#4CAF50', '#8BC34A', '#E8F5E8'],
          description: 'Cool analogous palette from blue to green',
          reason: 'Evokes nature and tranquility',
          confidence: 91,
          tags: ['cool', 'natural', 'calming'],
          usage: 'Great for environmental and health-focused applications'
        },
        {
          id: 19,
          title: 'Double Complementary',
          colors: ['#E91E63', '#4CAF50', '#FF9800', '#2196F3', '#FFFFFF'],
          description: 'Dynamic double complementary scheme',
          reason: 'Provides rich contrast and visual interest',
          confidence: 84,
          tags: ['dynamic', 'rich', 'contrasting'],
          usage: 'Excellent for creative projects and artistic portfolios'
        },
        {
          id: 20,
          title: 'Neutral Harmony',
          colors: ['#795548', '#9E9E9E', '#607D8B', '#F5F5F5', '#FFFFFF'],
          description: 'Sophisticated neutral color harmony',
          reason: 'Creates timeless elegance and versatility',
          confidence: 93,
          tags: ['neutral', 'timeless', 'elegant'],
          usage: 'Perfect for luxury brands and minimalist designs'
        }
      ],
      psychology: [
        {
          id: 21,
          title: 'Trust & Reliability',
          colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#DBEAFE', '#F0F9FF'],
          description: 'Blues that inspire trust and professionalism',
          reason: 'Psychologically associated with stability and trust',
          confidence: 96,
          tags: ['trustworthy', 'professional', 'calm'],
          usage: 'Ideal for financial services and corporate websites'
        },
        {
          id: 22,
          title: 'Energy & Appetite',
          colors: ['#DC2626', '#EF4444', '#F87171', '#FEE2E2', '#FEF2F2'],
          description: 'Reds that stimulate appetite and urgency',
          reason: 'Known to increase heart rate and create urgency',
          confidence: 91,
          tags: ['energetic', 'urgent', 'appetizing'],
          usage: 'Perfect for food delivery apps and sale banners'
        },
        {
          id: 23,
          title: 'Growth & Harmony',
          colors: ['#059669', '#10B981', '#34D399', '#D1FAE5', '#ECFDF5'],
          description: 'Greens that represent growth and balance',
          reason: 'Associated with nature, growth, and prosperity',
          confidence: 89,
          tags: ['natural', 'growing', 'balanced'],
          usage: 'Excellent for environmental and finance apps'
        },
        {
          id: 24,
          title: 'Creativity & Innovation',
          colors: ['#7C3AED', '#A855F7', '#C084FC', '#E9D5FF', '#FAF5FF'],
          description: 'Purple tones that stimulate creativity',
          reason: 'Associated with imagination and luxury',
          confidence: 87,
          tags: ['creative', 'imaginative', 'luxury'],
          usage: 'Perfect for creative platforms and premium services'
        },
        {
          id: 25,
          title: 'Happiness & Optimism',
          colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#FEF3C7', '#FFFBEB'],
          description: 'Yellow hues that promote positivity',
          reason: 'Stimulates mental activity and generates muscle energy',
          confidence: 85,
          tags: ['optimistic', 'cheerful', 'energizing'],
          usage: 'Great for educational and children\'s applications'
        },
        {
          id: 26,
          title: 'Sophistication & Elegance',
          colors: ['#111827', '#374151', '#6B7280', '#D1D5DB', '#F9FAFB'],
          description: 'Grays that convey sophistication and neutrality',
          reason: 'Associated with professionalism and timelessness',
          confidence: 92,
          tags: ['sophisticated', 'neutral', 'timeless'],
          usage: 'Ideal for luxury brands and professional portfolios'
        },
        {
          id: 27,
          title: 'Passion & Romance',
          colors: ['#BE185D', '#EC4899', '#F472B6', '#FBCFE8', '#FDF2F8'],
          description: 'Pink tones that evoke romance and compassion',
          reason: 'Associated with love, care, and nurturing',
          confidence: 83,
          tags: ['romantic', 'caring', 'feminine'],
          usage: 'Perfect for beauty, wellness, and lifestyle brands'
        },
        {
          id: 28,
          title: 'Stability & Security',
          colors: ['#92400E', '#B45309', '#D97706', '#FCD34D', '#FEF3C7'],
          description: 'Brown and orange tones for stability',
          reason: 'Earth tones create feelings of security and comfort',
          confidence: 88,
          tags: ['stable', 'secure', 'earthy'],
          usage: 'Great for real estate and financial planning services'
        },
        {
          id: 29,
          title: 'Technology & Innovation',
          colors: ['#0EA5E9', '#06B6D4', '#67E8F9', '#CFFAFE', '#F0FDFF'],
          description: 'Cyan blues that represent technology',
          reason: 'Associated with digital innovation and clarity',
          confidence: 90,
          tags: ['tech', 'innovative', 'digital'],
          usage: 'Perfect for SaaS platforms and tech startups'
        },
        {
          id: 30,
          title: 'Health & Vitality',
          colors: ['#059669', '#10B981', '#6EE7B7', '#D1FAE5', '#ECFDF5'],
          description: 'Fresh greens promoting health and vitality',
          reason: 'Associated with life, renewal, and wellness',
          confidence: 94,
          tags: ['healthy', 'vital', 'fresh'],
          usage: 'Excellent for healthcare and fitness applications'
        }
      ],
      accessibility: [
        {
          id: 31,
          title: 'High Contrast Pro',
          colors: ['#000000', '#FFFFFF', '#1F2937', '#F9FAFB', '#6B7280'],
          description: 'Maximum accessibility with perfect contrast ratios',
          reason: 'Meets WCAG AAA standards for all text sizes',
          confidence: 100,
          tags: ['accessible', 'contrast', 'readable'],
          usage: 'Essential for government and educational websites'
        },
        {
          id: 32,
          title: 'Colorblind Friendly',
          colors: ['#0173B2', '#DE8F05', '#029E73', '#CC78BC', '#CA9161'],
          description: 'Colors distinguishable by all types of colorblindness',
          reason: 'Tested with deuteranopia and protanopia simulations',
          confidence: 95,
          tags: ['colorblind-safe', 'inclusive', 'universal'],
          usage: 'Important for data visualization and charts'
        },
        {
          id: 33,
          title: 'Low Vision Support',
          colors: ['#1A1A1A', '#FFFFFF', '#FFD700', '#FF4444', '#44FF44'],
          description: 'High contrast colors for low vision users',
          reason: 'Provides maximum visibility for users with visual impairments',
          confidence: 98,
          tags: ['low-vision', 'high-contrast', 'accessible'],
          usage: 'Critical for accessibility-focused applications'
        },
        {
          id: 34,
          title: 'Blue-Yellow Safe',
          colors: ['#0066CC', '#FFCC00', '#000066', '#FFFF99', '#FFFFFF'],
          description: 'Safe color combination for blue-yellow colorblindness',
          reason: 'Avoids problematic red-green combinations',
          confidence: 93,
          tags: ['tritanopia-safe', 'accessible', 'clear'],
          usage: 'Excellent for medical and safety applications'
        },
        {
          id: 35,
          title: 'Pattern + Color',
          colors: ['#2D5AA0', '#F15A24', '#8DC63F', '#8B7CA6', '#F7941D'],
          description: 'Colors designed to work with patterns for accessibility',
          reason: 'Combines color with other visual cues for clarity',
          confidence: 89,
          tags: ['pattern-friendly', 'multi-modal', 'accessible'],
          usage: 'Perfect for complex data visualization'
        },
        {
          id: 36,
          title: 'Dark Mode Accessible',
          colors: ['#121212', '#1E1E1E', '#BB86FC', '#03DAC6', '#FFFFFF'],
          description: 'Dark mode colors that maintain accessibility',
          reason: 'Reduces eye strain while keeping contrast ratios',
          confidence: 91,
          tags: ['dark-mode', 'eye-friendly', 'modern'],
          usage: 'Ideal for applications with dark theme options'
        },
        {
          id: 37,
          title: 'Elderly-Friendly',
          colors: ['#000080', '#FFFFFF', '#800000', '#008000', '#FFD700'],
          description: 'Colors optimized for elderly users',
          reason: 'Accounts for age-related vision changes',
          confidence: 87,
          tags: ['senior-friendly', 'clear', 'readable'],
          usage: 'Great for healthcare and senior-focused applications'
        },
        {
          id: 38,
          title: 'Motion Sensitivity',
          colors: ['#4A5568', '#E2E8F0', '#2D3748', '#F7FAFC', '#718096'],
          description: 'Calm colors that reduce motion sensitivity triggers',
          reason: 'Avoids high contrast flashing combinations',
          confidence: 85,
          tags: ['motion-safe', 'calm', 'gentle'],
          usage: 'Important for users with vestibular disorders'
        },
        {
          id: 39,
          title: 'Cognitive Load Reduction',
          colors: ['#2B6CB0', '#FFFFFF', '#319795', '#F7FAFC', '#4A5568'],
          description: 'Simple color scheme to reduce cognitive load',
          reason: 'Limited palette reduces decision fatigue',
          confidence: 92,
          tags: ['simple', 'cognitive-friendly', 'clean'],
          usage: 'Perfect for educational and medical applications'
        },
        {
          id: 40,
          title: 'Print-Safe Accessible',
          colors: ['#000000', '#FFFFFF', '#4A5568', '#F7FAFC', '#2D3748'],
          description: 'Colors that maintain accessibility when printed',
          reason: 'Ensures contrast is maintained in grayscale',
          confidence: 96,
          tags: ['print-safe', 'grayscale-friendly', 'universal'],
          usage: 'Essential for documents and printable materials'
        }
      ],
      industry: [
        {
          id: 41,
          title: 'Tech Startup',
          colors: ['#667EEA', '#764BA2', '#F093FB', '#F5576C', '#4FACFE'],
          description: 'Modern gradients popular in tech companies',
          reason: 'Conveys innovation and forward-thinking',
          confidence: 92,
          tags: ['tech', 'innovative', 'modern'],
          usage: 'Perfect for SaaS platforms and mobile apps'
        },
        {
          id: 42,
          title: 'Healthcare Trust',
          colors: ['#0EA5E9', '#22C55E', '#FFFFFF', '#F0F9FF', '#ECFDF5'],
          description: 'Clean, trustworthy colors for healthcare',
          reason: 'Blues and greens inspire trust and healing',
          confidence: 94,
          tags: ['medical', 'clean', 'trustworthy'],
          usage: 'Ideal for medical apps and healthcare websites'
        },
        {
          id: 43,
          title: 'Financial Security',
          colors: ['#1E3A8A', '#1E40AF', '#3B82F6', '#DBEAFE', '#F0F9FF'],
          description: 'Conservative blues for financial services',
          reason: 'Conveys stability, trust, and professionalism',
          confidence: 96,
          tags: ['financial', 'stable', 'professional'],
          usage: 'Perfect for banks and investment platforms'
        },
        {
          id: 44,
          title: 'Education Excellence',
          colors: ['#7C2D12', '#DC2626', '#FBBF24', '#FEF3C7', '#FFFBEB'],
          description: 'Warm academic colors for education',
          reason: 'Creates welcoming and stimulating learning environment',
          confidence: 88,
          tags: ['educational', 'warm', 'engaging'],
          usage: 'Great for schools and e-learning platforms'
        },
        {
          id: 45,
          title: 'Retail Energy',
          colors: ['#DC2626', '#F59E0B', '#FFFFFF', '#FEE2E2', '#FEF3C7'],
          description: 'Energetic colors for retail and e-commerce',
          reason: 'Stimulates purchasing decisions and urgency',
          confidence: 85,
          tags: ['retail', 'energetic', 'commercial'],
          usage: 'Perfect for e-commerce and retail applications'
        },
        {
          id: 46,
          title: 'Legal Authority',
          colors: ['#1F2937', '#374151', '#6B7280', '#D1D5DB', '#F9FAFB'],
          description: 'Authoritative grays for legal services',
          reason: 'Conveys professionalism and trustworthiness',
          confidence: 93,
          tags: ['legal', 'authoritative', 'professional'],
          usage: 'Ideal for law firms and legal platforms'
        },
        {
          id: 47,
          title: 'Food & Hospitality',
          colors: ['#DC2626', '#F59E0B', '#84CC16', '#FFFFFF', '#FEF3C7'],
          description: 'Appetizing colors for food industry',
          reason: 'Stimulates appetite and creates warmth',
          confidence: 90,
          tags: ['food', 'appetizing', 'warm'],
          usage: 'Perfect for restaurants and food delivery apps'
        },
        {
          id: 48,
          title: 'Real Estate Luxury',
          colors: ['#92400E', '#B45309', '#D97706', '#FCD34D', '#FEF3C7'],
          description: 'Earthy luxury tones for real estate',
          reason: 'Conveys stability, investment, and quality',
          confidence: 87,
          tags: ['luxury', 'stable', 'premium'],
          usage: 'Great for real estate and property platforms'
        },
        {
          id: 49,
          title: 'Entertainment Vibrant',
          colors: ['#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'],
          description: 'Vibrant colors for entertainment industry',
          reason: 'Creates excitement and captures attention',
          confidence: 83,
          tags: ['vibrant', 'entertaining', 'exciting'],
          usage: 'Perfect for gaming and entertainment platforms'
        },
        {
          id: 50,
          title: 'Non-Profit Compassion',
          colors: ['#059669', '#0EA5E9', '#FFFFFF', '#ECFDF5', '#F0F9FF'],
          description: 'Compassionate colors for non-profit organizations',
          reason: 'Evokes trust, hope, and positive change',
          confidence: 91,
          tags: ['compassionate', 'hopeful', 'trustworthy'],
          usage: 'Ideal for charities and non-profit organizations'
        }
      ],
      seasonal: [
        {
          id: 51,
          title: 'Spring Awakening',
          colors: ['#84CC16', '#EAB308', '#F97316', '#EC4899', '#8B5CF6'],
          description: 'Fresh, vibrant colors of spring renewal',
          reason: 'Captures the energy and growth of spring season',
          confidence: 88,
          tags: ['fresh', 'vibrant', 'renewal'],
          usage: 'Great for spring campaigns and lifestyle brands'
        },
        {
          id: 52,
          title: 'Summer Sunshine',
          colors: ['#FBBF24', '#F59E0B', '#EF4444', '#EC4899', '#FFFFFF'],
          description: 'Bright summer colors full of energy',
          reason: 'Evokes warmth, joy, and outdoor activities',
          confidence: 92,
          tags: ['bright', 'energetic', 'joyful'],
          usage: 'Perfect for summer promotions and outdoor brands'
        },
        {
          id: 53,
          title: 'Autumn Warmth',
          colors: ['#B45309', '#DC2626', '#EAB308', '#16A34A', '#7C2D12'],
          description: 'Rich, warm colors inspired by fall foliage',
          reason: 'Evokes feelings of comfort and harvest',
          confidence: 90,
          tags: ['warm', 'cozy', 'harvest'],
          usage: 'Perfect for autumn promotions and cozy brands'
        },
        {
          id: 54,
          title: 'Winter Elegance',
          colors: ['#1E3A8A', '#1E40AF', '#FFFFFF', '#E0E7FF', '#F8FAFC'],
          description: 'Cool, elegant colors of winter season',
          reason: 'Creates sophisticated and serene atmosphere',
          confidence: 89,
          tags: ['cool', 'elegant', 'serene'],
          usage: 'Ideal for winter campaigns and luxury brands'
        },
        {
          id: 55,
          title: 'Holiday Celebration',
          colors: ['#DC2626', '#059669', '#FBBF24', '#FFFFFF', '#FEF2F2'],
          description: 'Festive colors for holiday celebrations',
          reason: 'Traditional holiday colors that evoke celebration',
          confidence: 95,
          tags: ['festive', 'traditional', 'celebratory'],
          usage: 'Perfect for holiday marketing and seasonal promotions'
        },
        {
          id: 56,
          title: 'Easter Pastels',
          colors: ['#F472B6', '#A855F7', '#22D3EE', '#84CC16', '#FEF08A'],
          description: 'Soft pastel colors for Easter and spring celebrations',
          reason: 'Associated with renewal and new beginnings',
          confidence: 86,
          tags: ['pastel', 'spring', 'renewal'],
          usage: 'Great for spring festivals and family-oriented brands'
        },
        {
          id: 57,
          title: 'Halloween Mystery',
          colors: ['#EA580C', '#000000', '#7C2D12', '#F59E0B', '#FED7AA'],
          description: 'Mysterious colors for Halloween and autumn events',
          reason: 'Creates spooky yet fun atmosphere',
          confidence: 84,
          tags: ['spooky', 'mysterious', 'fun'],
          usage: 'Perfect for Halloween promotions and entertainment'
        },
        {
          id: 58,
          title: 'Back to School',
          colors: ['#1E40AF', '#DC2626', '#FBBF24', '#059669', '#FFFFFF'],
          description: 'Classic school colors for educational campaigns',
          reason: 'Evokes learning, growth, and academic achievement',
          confidence: 88,
          tags: ['academic', 'learning', 'classic'],
          usage: 'Ideal for educational institutions and learning platforms'
        },
        {
          id: 59,
          title: 'Summer Vacation',
          colors: ['#0EA5E9', '#06B6D4', '#FBBF24', '#FFFFFF', '#F0F9FF'],
          description: 'Beach-inspired colors for summer vacations',
          reason: 'Evokes relaxation, ocean, and tropical destinations',
          confidence: 91,
          tags: ['beach', 'relaxing', 'tropical'],
          usage: 'Perfect for travel and vacation-related applications'
        },
        {
          id: 60,
          title: 'New Year Fresh Start',
          colors: ['#3B82F6', '#8B5CF6', '#FBBF24', '#FFFFFF', '#F0F9FF'],
          description: 'Inspiring colors for new year and fresh starts',
          reason: 'Conveys optimism, new beginnings, and achievement',
          confidence: 87,
          tags: ['optimistic', 'fresh', 'inspiring'],
          usage: 'Great for New Year campaigns and goal-setting apps'
        }
      ]
    };

    return suggestionData[type] || [];
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const copyPalette = (colors) => {
    const paletteText = colors.join(', ');
    copyToClipboard(paletteText);
  };

  const downloadPalette = (suggestion) => {
    const data = {
      title: suggestion.title,
      colors: suggestion.colors,
      description: suggestion.description,
      reason: suggestion.reason,
      tags: suggestion.tags,
      confidence: suggestion.confidence
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${suggestion.title.replace(/\s+/g, '_')}_suggestion.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return '#10B981'; // Green
    if (confidence >= 75) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  return (
    <div className="suggestions">
      <div className="suggestions-container">
        <header className="suggestions-header">
          <h1 className="suggestions-title">AI Color Suggestions</h1>
          <p className="suggestions-subtitle">
            Get intelligent color recommendations based on trends, psychology, and best practices
          </p>
        </header>

        {/* Suggestion Types */}
        <div className="types-section">
          <div className="types-grid">
            {suggestionTypes.map(type => (
              <button
                key={type.id}
                className={`type-card ${selectedType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <span className="type-icon">{type.icon}</span>
                <h3 className="type-name">{type.name}</h3>
                <p className="type-description">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="suggestions-content">
          {isLoading ? (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>Generating AI suggestions...</p>
            </div>
          ) : (
            <div className="suggestions-grid">
              {suggestions.map(suggestion => (
                <div key={suggestion.id} className="suggestion-card">
                  <div className="suggestion-header">
                    <div className="suggestion-title-area">
                      <h3 className="suggestion-title">{suggestion.title}</h3>
                      <div className="confidence-badge">
                        <span 
                          className="confidence-dot"
                          style={{ backgroundColor: getConfidenceColor(suggestion.confidence) }}
                        ></span>
                        {suggestion.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  
                  <div className="color-palette">
                    {suggestion.colors.map((color, index) => (
                      <div
                        key={index}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                        title={`${color} - Click to copy`}
                      >
                        <span className="color-code">{color}</span>
                      </div>
                    ))}
                  </div>

                  <p className="suggestion-description">{suggestion.description}</p>
                  
                  <div className="suggestion-reason">
                    <strong>Why this works:</strong> {suggestion.reason}
                  </div>

                  <div className="suggestion-usage">
                    <strong>Best for:</strong> {suggestion.usage}
                  </div>
                  
                  <div className="suggestion-tags">
                    {suggestion.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>

                  <div className="suggestion-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => copyPalette(suggestion.colors)}
                      title="Copy all colors"
                    >
                      📋 Copy Colors
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setSelectedColor(suggestion)}
                      title="View details"
                    >
                      👁️ Analyze
                    </button>
                    <button 
                      className="btn btn-accent"
                      onClick={() => downloadPalette(suggestion)}
                      title="Download suggestion"
                    >
                      💾 Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {suggestions.length === 0 && !isLoading && (
            <div className="empty-state">
              <h3>No suggestions found</h3>
              <p>Try selecting a different suggestion type.</p>
            </div>
          )}
        </div>

        {/* Color Analysis Modal */}
        {selectedColor && (
          <div className="modal-overlay" onClick={() => setSelectedColor(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedColor.title} Analysis</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedColor(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="modal-body">
                <div className="large-color-palette">
                  {selectedColor.colors.map((color, index) => (
                    <div
                      key={index}
                      className="large-color-swatch"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color)}
                    >
                      <span className="large-color-code">{color}</span>
                    </div>
                  ))}
                </div>
                
                <div className="analysis-details">
                  <div className="analysis-section">
                    <h3>Color Psychology</h3>
                    <p>{selectedColor.description}</p>
                  </div>
                  
                  <div className="analysis-section">
                    <h3>Why This Works</h3>
                    <p>{selectedColor.reason}</p>
                  </div>
                  
                  <div className="analysis-section">
                    <h3>Usage Recommendations</h3>
                    <p>{selectedColor.usage}</p>
                  </div>

                  <div className="analysis-section">
                    <h3>Confidence Score</h3>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill"
                        style={{ 
                          width: `${selectedColor.confidence}%`,
                          backgroundColor: getConfidenceColor(selectedColor.confidence)
                        }}
                      ></div>
                    </div>
                    <p>{selectedColor.confidence}% - Based on color theory, trends, and user data</p>
                  </div>
                  
                  <div className="analysis-section">
                    <h3>Tags</h3>
                    <div className="suggestion-tags">
                      {selectedColor.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => copyPalette(selectedColor.colors)}
                >
                  📋 Copy All Colors
                </button>
                <button 
                  className="btn btn-accent"
                  onClick={() => downloadPalette(selectedColor)}
                >
                  💾 Download Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggestions;