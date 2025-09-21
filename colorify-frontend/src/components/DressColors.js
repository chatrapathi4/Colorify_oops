import React, { useState, useEffect, useCallback } from 'react';
import './DressColors.css';

const DressColors = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('casual');
  const [selectedSkinTone, setSelectedSkinTone] = useState('medium');
  const [outfitSuggestions, setOutfitSuggestions] = useState([]);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const genderOptions = [
    {
      id: 'girl',
      label: 'For Girls',
      icon: '👩',
      description: 'Discover beautiful color combinations for feminine outfits',
      theme: 'feminine'
    },
    {
      id: 'boy',
      label: 'For Boys',
      icon: '👨',
      description: 'Explore stylish color palettes for masculine outfits',
      theme: 'masculine'
    }
  ];

  const getCategories = (gender) => {
    const baseCategories = [
      { id: 'all', name: 'All Outfits', icon: '👔' },
      { id: 'casual', name: 'Casual', icon: '👕' },
      { id: 'formal', name: 'Formal', icon: '🤵' },
      { id: 'party', name: 'Party', icon: '🎉' },
      { id: 'work', name: 'Work', icon: '💼' },
      { id: 'date', name: 'Date Night', icon: '💕' }
    ];

    if (gender === 'girl') {
      return [
        ...baseCategories,
        { id: 'ethnic', name: 'Ethnic', icon: '🥻' },
        { id: 'wedding', name: 'Wedding', icon: '👰' }
      ];
    } else {
      return [
        ...baseCategories,
        { id: 'sports', name: 'Sports', icon: '⚽' },
        { id: 'business', name: 'Business', icon: '📊' }
      ];
    }
  };

  const occasions = [
    { id: 'casual', name: 'Casual Day', icon: '☀️' },
    { id: 'office', name: 'Office', icon: '🏢' },
    { id: 'evening', name: 'Evening', icon: '🌙' },
    { id: 'special', name: 'Special Event', icon: '✨' },
    { id: 'weekend', name: 'Weekend', icon: '🎭' }
  ];

  const skinTones = [
    { id: 'fair', name: 'Fair', color: '#FDBCB4' },
    { id: 'light', name: 'Light', color: '#EDB98A' },
    { id: 'medium', name: 'Medium', color: '#D08B5B' },
    { id: 'olive', name: 'Olive', color: '#AE7242' },
    { id: 'dark', name: 'Dark', color: '#754C24' },
    { id: 'deep', name: 'Deep', color: '#4A2C17' }
  ];

  const generateMockOutfits = useCallback((gender, category, occasion, skinTone) => {
    const girlOutfits = {
      casual: [
        {
          id: 1,
          title: 'Pastel Spring Look',
          colors: ['#FFB6C1', '#E6E6FA', '#FFFACD', '#F0F8FF'],
          description: 'Soft pastels perfect for a casual day out',
          items: [
            {
              name: 'Light Pink Top',
              type: 'top',
              color: '#FFB6C1',
              image: 'https://plus.unsplash.com/premium_photo-1705554519595-c1143c7fef97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxpZ2h0JTIwcGluayUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
            },
            {
              name: 'Lavender Cardigan',
              type: 'cardigan',
              color: '#E6E6FA',
              image: 'https://plus.unsplash.com/premium_photo-1747664078762-4e72337921c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGElMjBjYXJkaWdhbiUyMHN3ZWF0ZXIlMjBpbiUyMGxhdmVuZGVyJTIwY29sb3J8ZW58MHx8MHx8fDA%3D'
            },
            {
              name: 'Cream Jeans',
              type: 'bottom',
              color: '#FFFACD',
              image: 'https://shopthemint.com/cdn/shop/files/111160.More-To-Love-Ecru-Cream-Denim-Pants.7107318382650__copy_2_600x.progressive.jpg?v=1701462278'
            },
            {
              name: 'White Sneakers',
              type: 'shoes',
              color: '#F0F8FF',
              image: 'https://images.unsplash.com/photo-1597350584914-55bb62285896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V2hpdGUlMjBTbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D'
            }
          ],
          tips: 'Perfect for spring picnics and casual meetups',
          skinMatch: ['fair', 'light', 'medium'],
          confidence: 92
        },
        {
          id: 2,
          title: 'Boho Chic',
          colors: ['#D2691E', '#F4A460', '#DEB887', '#F5DEB3'],
          description: 'Earthy tones for a bohemian vibe',
          items: [
            {
              name: 'Terracotta Blouse',
              type: 'top',
              color: '#D2691E',
              image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop'
            },
            {
              name: 'Sandy Brown Skirt',
              type: 'bottom',
              color: '#F4A460',
              image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=300&h=400&fit=crop'
            },
            {
              name: 'Beige Accessories',
              type: 'accessories',
              color: '#DEB887',
              image: 'https://images.unsplash.com/photo-1506629905607-c671c4715e3d?w=300&h=400&fit=crop'
            },
            {
              name: 'Tan Sandals',
              type: 'shoes',
              color: '#F5DEB3',
              image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop'
            }
          ],
          tips: 'Great for festivals and artistic events',
          skinMatch: ['medium', 'olive', 'dark'],
          confidence: 88
        },
        {
          id: 3,
          title: 'Fresh Mint',
          colors: ['#98FB98', '#F0FFF0', '#E0FFFF', '#F5FFFA'],
          description: 'Cool mint tones for fresh casual style',
          items: [
            {
              name: 'Mint Green Top',
              type: 'top',
              color: '#98FB98',
              image: 'https://images.unsplash.com/photo-1636696860536-30fc4f57493a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fE1pbnQlMjBHcmVlbiUyMFQlMjBzaGlydCUyMGZvciUyMHdvbWVufGVufDB8fDB8fHww'
            },
            {
              name: 'Honeydew Shorts',
              type: 'bottom',
              color: '#F0FFF0',
              image: 'https://plus.unsplash.com/premium_photo-1690406381395-c8982b59a90a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fEhvbmV5ZGV3JTIwU2hvcnRzfGVufDB8fDB8fHww'
            },
            {
              name: 'Light Cyan Jacket',
              type: 'outerwear',
              color: '#E0FFFF',
              image: 'https://plus.unsplash.com/premium_photo-1661375305814-84afd68fd1a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxqYWNrZXR8ZW58MHx8MHx8fDA%3D'
            },
            {
              name: 'Mint Cream Flats',
              type: 'shoes',
              color: '#F5FFFA',
              image: 'https://images.openai.com/thumbnails/url/DpNt3nicDclJDoIwAADAFwHKLokxEJCoWJBEQS8GSy0NW6Fl0Uf5H3-jc53vp-CcMkuSUAP7F-UoF_ijUUTMeMYJFGFbS6xoKSUN3nTr_1k2yFc-jEcayuegnCmYeOXe58zWjSyxBa5PbOrZbgrUvR6bXYRVPyLjNoSkSpW0lgePzIT2Aka3YF4yJ8Gae4kC4ppX7W0Atyh0-5kPIDq2peJ4pZwBuYddszgd0A9jPj5O'
            }
          ],
          tips: 'Refreshing for summer outings and brunch dates',
          skinMatch: ['fair', 'light', 'olive'],
          confidence: 85
        }
      ],
      formal: [
        {
          id: 4,
          title: 'Elegant Navy',
          colors: ['#191970', '#4682B4', '#B0C4DE', '#F8F8FF'],
          description: 'Sophisticated navy ensemble',
          items: [
            {
              name: 'Navy Blazer',
              type: 'jacket',
              color: '#191970',
              image: 'https://media.istockphoto.com/id/2154801405/photo/professional-woman-smiling-confidently-in-business-attire.webp?a=1&b=1&s=612x612&w=0&k=20&c=uCP7spn2ASyJmXTkR4IhhO_h7mVjj21M1ymbDZyKHuU='
            },
            {
              name: 'Steel Blue Blouse',
              type: 'top',
              color: '#4682B4',
              image: 'https://images.unsplash.com/photo-1752486268221-901251de97f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3RlZWwlMjBCbHVlJTIwQmxvdXNlJTIwZm9yJTIwd29tZW58ZW58MHx8MHx8fDA%3D'
            },
            {
              name: 'Light Steel Pants',
              type: 'bottom',
              color: '#B0C4DE',
              image: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFudHxlbnwwfHwwfHx8MA%3D%3D'
            },
            {
              name: 'Ghost White Accessories',
              type: 'accessories',
              color: '#F8F8FF',
              image: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFjY2Vzc29yeXxlbnwwfHwwfHx8MA%3D%3D'
            }
          ],
          tips: 'Perfect for business meetings and formal events',
          skinMatch: ['fair', 'light', 'olive'],
          confidence: 95
        },
        {
          id: 5,
          title: 'Classic Black',
          colors: ['#000000', '#2F2F2F', '#696969', '#D3D3D3'],
          description: 'Timeless black formal wear',
          items: [
            {
              name: 'Black Dress',
              type: 'dress',
              color: '#000000',
              image: 'https://m.media-amazon.com/images/I/51FEojlCPyL._AC_UL320_.jpg'
            },
            {
              name: 'Dark Gray Blazer',
              type: 'jacket',
              color: '#2F2F2F',
              image: 'https://m.media-amazon.com/images/I/51JxvVUizIL._AC_UL320_.jpg'
            },
            {
              name: 'Dim Gray Belt',
              type: 'accessories',
              color: '#696969',
              image: 'https://m.media-amazon.com/images/I/71id92ER4-L._AC_UL320_.jpg'
            },
            {
              name: 'Light Gray Shoes',
              type: 'shoes',
              color: '#D3D3D3',
              image: 'https://m.media-amazon.com/images/I/51gPID7wg8L._AC_UL320_.jpg'
            }
          ],
          tips: 'Sophisticated for evening events and formal dinners',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 97
        },
        {
          id: 6,
          title: 'Burgundy Elegance',
          colors: ['#800020', '#8B0000', '#DC143C', '#FFB6C1'],
          description: 'Rich burgundy for formal occasions',
          items: [
            {
              name: 'Burgundy Dress',
              image: 'https://m.media-amazon.com/images/I/51HBk82HyFL._AC_UL320_.jpg'
            },
            {
              name: 'Dark Red Blazer',
              image: 'https://m.media-amazon.com/images/I/51T-lZZt9iL._AC_UL320_.jpg'
            },
            {
              name: 'Crimson Accessories',
              image: 'https://m.media-amazon.com/images/I/51FCAtyv2fL._AC_UL320_.jpg'
            },
            {
              name: 'Light Pink Clutch',
              image: 'https://m.media-amazon.com/images/I/81lhPXCvcwL._AC_UL320_.jpg'
            }
          ],
          tips: 'Perfect for formal events and wine tastings',
          skinMatch: ['medium', 'olive', 'dark'],
          confidence: 89
        }
      ],
      party: [
        {
          id: 7,
          title: 'Glamorous Night',
          colors: ['#800080', '#9370DB', '#DDA0DD', '#E6E6FA'],
          description: 'Purple glamour for special nights',
          items: ['Purple Dress', 'Medium Orchid Heels', 'Plum Clutch', 'Lavender Jewelry'],
          tips: 'Stunning for cocktail parties and celebrations',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 90
        },
        {
          id: 8,
          title: 'Golden Goddess',
          colors: ['#FFD700', '#FFA500', '#FF8C00', '#FFFFE0'],
          description: 'Shimmering gold for party nights',
          items: ['Gold Sequin Dress', 'Orange Heels', 'Dark Orange Clutch', 'Light Yellow Jewelry'],
          tips: 'Eye-catching for parties and celebrations',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 88
        },
        {
          id: 9,
          title: 'Emerald Elegance',
          colors: ['#50C878', '#228B22', '#006400', '#F0FFF0'],
          description: 'Rich emerald green for sophistication',
          items: ['Emerald Dress', 'Forest Green Heels', 'Dark Green Clutch', 'Honeydew Accessories'],
          tips: 'Sophisticated for upscale parties and galas',
          skinMatch: ['fair', 'light', 'medium'],
          confidence: 91
        }
      ],
      work: [
        {
          id: 10,
          title: 'Professional Blue',
          colors: ['#003366', '#0066CC', '#87CEEB', '#F0F8FF'],
          description: 'Professional blue ensemble',
          items: ['Navy Suit', 'Blue Blouse', 'Sky Blue Scarf', 'Alice Blue Bag'],
          tips: 'Perfect for office meetings and presentations',
          skinMatch: ['fair', 'light', 'medium', 'olive'],
          confidence: 94
        },
        {
          id: 11,
          title: 'Sophisticated Gray',
          colors: ['#708090', '#A9A9A9', '#D3D3D3', '#F5F5F5'],
          description: 'Elegant gray work attire',
          items: ['Slate Gray Suit', 'Dark Gray Blouse', 'Light Gray Accessories', 'White Shirt'],
          tips: 'Versatile for any professional environment',
          skinMatch: ['fair', 'light', 'medium', 'olive', 'dark'],
          confidence: 96
        },
        {
          id: 12,
          title: 'Warm Beige',
          colors: ['#F5F5DC', '#DEB887', '#D2B48C', '#8B7355'],
          description: 'Warm beige professional look',
          items: ['Beige Blazer', 'Burlywood Pants', 'Tan Blouse', 'Dark Khaki Shoes'],
          tips: 'Approachable for client meetings and teamwork',
          skinMatch: ['medium', 'olive', 'dark'],
          confidence: 87
        }
      ],
      date: [
        {
          id: 13,
          title: 'Romantic Rose',
          colors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFCCCB'],
          description: 'Romantic pink tones for date night',
          items: ['Hot Pink Dress', 'Light Pink Cardigan', 'Pink Heels', 'Misty Rose Clutch'],
          tips: 'Sweet and romantic for dinner dates',
          skinMatch: ['fair', 'light', 'medium'],
          confidence: 89
        },
        {
          id: 14,
          title: 'Sunset Romance',
          colors: ['#FF4500', '#FF6347', '#FFA07A', '#FFE4E1'],
          description: 'Warm sunset colors for romantic evenings',
          items: ['Orange Red Dress', 'Tomato Jacket', 'Light Salmon Shoes', 'Misty Rose Accessories'],
          tips: 'Perfect for sunset dinner dates',
          skinMatch: ['medium', 'olive', 'dark'],
          confidence: 86
        },
        {
          id: 15,
          title: 'Violet Dreams',
          colors: ['#8A2BE2', '#9932CC', '#DA70D6', '#E6E6FA'],
          description: 'Dreamy violet for romantic occasions',
          items: ['Blue Violet Dress', 'Dark Orchid Heels', 'Orchid Clutch', 'Lavender Jewelry'],
          tips: 'Enchanting for romantic dinners and dates',
          skinMatch: ['fair', 'light', 'olive'],
          confidence: 88
        }
      ],
      ethnic: [
        {
          id: 31,
          title: 'Traditional Red & Gold',
          colors: ['#DC143C', '#FFD700', '#800020', '#FFF8DC'],
          description: 'Classic ethnic combination',
          items: ['Crimson Saree/Lehenga', 'Gold Blouse', 'Burgundy Dupatta', 'Cream Accessories'],
          tips: 'Perfect for festivals and traditional celebrations',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 96
        },
        {
          id: 32,
          title: 'Royal Purple & Silver',
          colors: ['#4B0082', '#9370DB', '#C0C0C0', '#F8F8FF'],
          description: 'Regal purple ethnic wear',
          items: ['Indigo Anarkali', 'Medium Slate Blue Dupatta', 'Silver Jewelry', 'Ghost White Churidar'],
          tips: 'Elegant for weddings and formal ethnic events',
          skinMatch: ['fair', 'light', 'medium', 'olive'],
          confidence: 93
        },
        {
          id: 33,
          title: 'Emerald & Copper',
          colors: ['#50C878', '#228B22', '#B87333', '#F5DEB3'],
          description: 'Rich emerald with warm copper accents',
          items: ['Emerald Kurti', 'Forest Green Palazzo', 'Copper Jewelry', 'Wheat Shawl'],
          tips: 'Beautiful for cultural events and family gatherings',
          skinMatch: ['medium', 'olive', 'dark'],
          confidence: 89
        }
      ],
      wedding: [
        {
          id: 34,
          title: 'Bridal Ivory & Rose Gold',
          colors: ['#FFFFF0', '#E6E6FA', '#CD7F32', '#FFE4E1'],
          description: 'Elegant bridal color scheme',
          items: ['Ivory Wedding Dress', 'Lavender Bridesmaid Dresses', 'Bronze Accessories', 'Misty Rose Flowers'],
          tips: 'Timeless and romantic for traditional weddings',
          skinMatch: ['fair', 'light', 'medium'],
          confidence: 98
        },
        {
          id: 35,
          title: 'Deep Maroon & Gold',
          colors: ['#800000', '#FFD700', '#8B0000', '#FFF8DC'],
          description: 'Rich traditional wedding colors',
          items: ['Maroon Lehenga', 'Gold Embroidery', 'Dark Red Dupatta', 'Cornsilk Veil'],
          tips: 'Perfect for traditional and cultural wedding ceremonies',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 95
        },
        {
          id: 36,
          title: 'Blush Pink & Champagne',
          colors: ['#F8BBD0', '#FFC0CB', '#F7E7CE', '#FFFFFF'],
          description: 'Soft romantic wedding palette',
          items: ['Blush Pink Gown', 'Pink Bridesmaid Dresses', 'Champagne Sash', 'White Accessories'],
          tips: 'Dreamy for garden weddings and romantic ceremonies',
          skinMatch: ['fair', 'light', 'medium'],
          confidence: 92
        }
      ]
    };

    const boyOutfits = {
      casual: [
        {
          id: 16,
          title: 'Urban Cool',
          colors: ['#2F4F4F', '#708090', '#A9A9A9', '#FFFFFF'],
          description: 'Modern urban streetwear',
          items: [
            {
              name: 'Dark Slate Gray Hoodie',
              type: 'top',
              color: '#2F4F4F',
              image: 'https://m.media-amazon.com/images/I/81uduov5yCL._SY741_.jpg'
            },
            {
              name: 'Slate Gray Jeans',
              type: 'bottom',
              color: '#708090',
              image: 'https://m.media-amazon.com/images/I/71vSy-vxjvL._AC_UL320_.jpg'
            },
            {
              name: 'Gray Sneakers',
              type: 'shoes',
              color: '#A9A9A9',
              image: 'https://m.media-amazon.com/images/I/71Xag1O3QBL._AC_UL320_.jpg'
            },
            {
              name: 'White Cap',
              type: 'accessories',
              color: '#FFFFFF',
              image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=400&fit=crop'
            }
          ],
          tips: 'Perfect for casual outings and weekend activities',
          skinMatch: ['medium', 'olive', 'dark'],
          confidence: 89
        },
        {
          id: 17,
          title: 'Classic Casual',
          colors: ['#000080', '#87CEEB', '#F5F5F5', '#FFFFFF'],
          description: 'Timeless blue and white combination',
          items: [
            {
              name: 'Navy Polo',
              type: 'top',
              color: '#000080',
              image: 'https://m.media-amazon.com/images/I/31pj6JZo8EL._AC_UL320_.jpg'
            },
            {
              name: 'Sky Blue Chinos',
              type: 'bottom',
              color: '#87CEEB',
              image: 'https://m.media-amazon.com/images/I/51EsTqSNlOL._AC_UL320_.jpg'
            },
            {
              name: 'White Sneakers',
              type: 'shoes',
              color: '#F5F5F5',
              image: 'https://m.media-amazon.com/images/I/41g5sx2v3QL._AC_UL320_.jpg'
            },
            {
              name: 'Silver Watch',
              type: 'accessories',
              color: '#FFFFFF',
              image: 'https://m.media-amazon.com/images/I/71NKeDLSuKL._AC_UL320_.jpg'
            }
          ],
          tips: 'Great for dates and casual meetings',
          skinMatch: ['fair', 'light', 'medium'],
          confidence: 94
        },
        {
          id: 18,
          title: 'Earth Tones',
          colors: ['#8B4513', '#CD853F', '#F4A460', '#FFFAF0'],
          description: 'Natural earth-inspired casual wear',
          items: [
            {
              name: 'Saddle Brown Jacket',
              type: 'jacket',
              color: '#8B4513',
              image: 'https://m.media-amazon.com/images/I/71R655Ol4GL._AC_UL320_.jpg'
            },
            {
              name: 'Peru Chinos',
              type: 'bottom',
              color: '#CD853F',
              image: 'https://m.media-amazon.com/images/I/51t8B5DQBxL._AC_UL320_.jpg'
            },
            {
              name: 'Sandy Brown Shirt',
              type: 'top',
              color: '#F4A460',
              image: 'https://m.media-amazon.com/images/I/612tl7v0BPL._AC_UL320_.jpg'
            },
            {
              name: 'Floral White Sneakers',
              type: 'shoes',
              color: '#FFFAF0',
              image: 'https://m.media-amazon.com/images/I/618vZS-D4cL._AC_UL320_.jpg'
            }
          ],
          tips: 'Relaxed for outdoor activities and casual hangouts',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 87
        }
      ],
      formal: [
        {
          id: 19,
          title: 'Business Professional',
          colors: ['#2F2F2F', '#696969', '#D3D3D3', '#FFFFFF'],
          description: 'Sharp professional look',
          items: [
            {
              name: 'Charcoal Suit',
              type: 'suit',
              color: '#2F2F2F',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
            },
            {
              name: 'Dim Gray Tie',
              type: 'accessory',
              color: '#696969',
              image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=300&h=400&fit=crop'
            },
            {
              name: 'Light Gray Shirt',
              type: 'shirt',
              color: '#D3D3D3',
              image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop'
            },
            {
              name: 'White Pocket Square',
              type: 'accessory',
              color: '#FFFFFF',
              image: 'https://images.unsplash.com/photo-1566479179817-c0d43e8b8c40?w=300&h=400&fit=crop'
            }
          ],
          tips: 'Essential for business meetings and formal events',
          skinMatch: ['fair', 'light', 'medium', 'olive'],
          confidence: 96
        },
        {
          id: 20,
          title: 'Classic Navy',
          colors: ['#191970', '#4169E1', '#87CEFA', '#F0F8FF'],
          description: 'Traditional navy formal ensemble',
          items: [
            {
              name: 'Midnight Blue Suit',
              type: 'suit',
              color: '#191970',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
            },
            {
              name: 'Royal Blue Tie',
              type: 'accessory',
              color: '#4169E1',
              image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=300&h=400&fit=crop'
            },
            {
              name: 'Light Sky Blue Shirt',
              type: 'shirt',
              color: '#87CEFA',
              image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop'
            },
            {
              name: 'Alice Blue Handkerchief',
              type: 'accessory',
              color: '#F0F8FF',
              image: 'https://images.unsplash.com/photo-1566479179817-c0d43e8b8c40?w=300&h=400&fit=crop'
            }
          ],
          tips: 'Timeless for weddings and formal occasions',
          skinMatch: ['fair', 'light', 'medium', 'olive'],
          confidence: 98
        },
        {
          id: 21,
          title: 'Sophisticated Black',
          colors: ['#000000', '#2F2F2F', '#696969', '#DCDCDC'],
          description: 'Elegant black formal wear',
          items: ['Black Tuxedo', 'Charcoal Vest', 'Dim Gray Bow Tie', 'Gainsboro Shirt'],
          tips: 'Perfect for black-tie events and galas',
          skinMatch: ['fair', 'light', 'medium', 'olive', 'dark', 'deep'],
          confidence: 97
        }
      ],
      party: [
        {
          id: 22,
          title: 'Sophisticated Evening',
          colors: ['#000000', '#8B0000', '#B22222', '#FFFFFF'],
          description: 'Bold black and red combination',
          items: ['Black Suit', 'Dark Red Shirt', 'Firebrick Tie', 'White Shoes'],
          tips: 'Perfect for evening parties and special occasions',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 91
        },
        {
          id: 23,
          title: 'Royal Purple',
          colors: ['#663399', '#8A2BE2', '#9370DB', '#E6E6FA'],
          description: 'Regal purple for standout style',
          items: ['Rebecca Purple Suit', 'Blue Violet Shirt', 'Medium Slate Blue Tie', 'Lavender Accessories'],
          tips: 'Bold choice for parties and celebrations',
          skinMatch: ['fair', 'light', 'medium'],
          confidence: 88
        },
        {
          id: 24,
          title: 'Emerald Night',
          colors: ['#006400', '#228B22', '#32CD32', '#F0FFF0'],
          description: 'Rich emerald green for special events',
          items: ['Dark Green Suit', 'Forest Green Shirt', 'Lime Green Tie', 'Honeydew Pocket Square'],
          tips: 'Unique for themed parties and celebrations',
          skinMatch: ['medium', 'olive', 'dark'],
          confidence: 85
        }
      ],
      work: [
        {
          id: 25,
          title: 'Corporate Blue',
          colors: ['#003366', '#0066CC', '#4169E1', '#F0F8FF'],
          description: 'Professional corporate attire',
          items: ['Dark Blue Suit', 'Blue Dress Shirt', 'Royal Blue Tie', 'Alice Blue Pocket Square'],
          tips: 'Trustworthy for important business meetings',
          skinMatch: ['fair', 'light', 'medium', 'olive'],
          confidence: 95
        },
        {
          id: 26,
          title: 'Modern Gray',
          colors: ['#4A4A4A', '#808080', '#C0C0C0', '#F8F8FF'],
          description: 'Contemporary gray work ensemble',
          items: ['Dark Gray Suit', 'Gray Shirt', 'Silver Tie', 'Ghost White Handkerchief'],
          tips: 'Versatile for any professional setting',
          skinMatch: ['fair', 'light', 'medium', 'olive', 'dark'],
          confidence: 93
        },
        {
          id: 27,
          title: 'Brown Professional',
          colors: ['#654321', '#8B4513', '#D2691E', '#F5DEB3'],
          description: 'Warm brown professional look',
          items: ['Dark Brown Suit', 'Saddle Brown Shirt', 'Chocolate Tie', 'Wheat Pocket Square'],
          tips: 'Approachable for creative industries',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 87
        }
      ],
      date: [
        {
          id: 28,
          title: 'Charming Blue',
          colors: ['#1E90FF', '#87CEEB', '#B0E0E6', '#F0F8FF'],
          description: 'Charming blue for romantic dates',
          items: ['Dodger Blue Shirt', 'Sky Blue Chinos', 'Powder Blue Jacket', 'Alice Blue Accessories'],
          tips: 'Approachable and charming for dinner dates',
          skinMatch: ['fair', 'light', 'medium'],
          confidence: 91
        },
        {
          id: 29,
          title: 'Warm Burgundy',
          colors: ['#800020', '#8B0000', '#DC143C', '#FFB6C1'],
          description: 'Rich burgundy for romantic evenings',
          items: ['Burgundy Shirt', 'Dark Red Pants', 'Crimson Jacket', 'Light Pink Tie'],
          tips: 'Sophisticated for wine bars and romantic dinners',
          skinMatch: ['medium', 'olive', 'dark'],
          confidence: 88
        },
        {
          id: 30,
          title: 'Forest Green',
          colors: ['#228B22', '#32CD32', '#90EE90', '#F0FFF0'],
          description: 'Natural green for outdoor dates',
          items: ['Forest Green Shirt', 'Lime Green Chinos', 'Light Green Jacket', 'Honeydew Accessories'],
          tips: 'Perfect for outdoor activities and nature dates',
          skinMatch: ['fair', 'light', 'olive'],
          confidence: 86
        }
      ],
      sports: [
        {
          id: 37,
          title: 'Athletic Blue',
          colors: ['#0066CC', '#87CEEB', '#E0E0E0', '#FFFFFF'],
          description: 'Classic sporty blue combination',
          items: ['Blue Athletic Shirt', 'Sky Blue Shorts', 'Gray Running Shoes', 'White Sports Socks'],
          tips: 'Perfect for gym workouts and outdoor sports',
          skinMatch: ['fair', 'light', 'medium', 'olive'],
          confidence: 94
        },
        {
          id: 38,
          title: 'Energetic Orange',
          colors: ['#FF4500', '#FFA500', '#000000', '#FFFFFF'],
          description: 'High-energy orange athletic wear',
          items: ['Orange Red Jersey', 'Orange Shorts', 'Black Athletic Shoes', 'White Sweatband'],
          tips: 'Great for team sports and high-intensity training',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 89
        },
        {
          id: 39,
          title: 'Forest Green Sports',
          colors: ['#228B22', '#32CD32', '#2F4F4F', '#F5F5F5'],
          description: 'Natural green athletic combination',
          items: ['Forest Green Track Suit', 'Lime Green Shirt', 'Dark Slate Gray Shoes', 'White Towel'],
          tips: 'Ideal for outdoor running and nature sports',
          skinMatch: ['fair', 'light', 'medium', 'olive'],
          confidence: 87
        }
      ],
      business: [
        {
          id: 40,
          title: 'Executive Navy',
          colors: ['#191970', '#4682B4', '#C0C0C0', '#FFFFFF'],
          description: 'High-level executive look',
          items: ['Midnight Blue Suit', 'Steel Blue Shirt', 'Silver Tie', 'White Pocket Square'],
          tips: 'Commanding presence for board meetings and executive functions',
          skinMatch: ['fair', 'light', 'medium', 'olive'],
          confidence: 97
        },
        {
          id: 41,
          title: 'Power Charcoal',
          colors: ['#36454F', '#708090', '#A9A9A9', '#F8F8FF'],
          description: 'Authoritative charcoal business attire',
          items: ['Charcoal Suit', 'Slate Gray Shirt', 'Dark Gray Tie', 'Ghost White Handkerchief'],
          tips: 'Projects authority and professionalism in corporate settings',
          skinMatch: ['fair', 'light', 'medium', 'olive', 'dark'],
          confidence: 95
        },
        {
          id: 42,
          title: 'Strategic Brown',
          colors: ['#654321', '#8B4513', '#D2B48C', '#F5DEB3'],
          description: 'Sophisticated brown business ensemble',
          items: [
            {
              name: 'Dark Brown Suit',
              type: 'suit',
              color: '#654321',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
            },
            {
              name: 'Saddle Brown Shirt',
              type: 'shirt',
              color: '#8B4513',
              image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop'
            },
            {
              name: 'Tan Tie',
              type: 'accessory',
              color: '#D2B48C',
              image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=300&h=400&fit=crop'
            },
            {
              name: 'Wheat Accessories',
              type: 'accessories',
              color: '#F5DEB3',
              image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=400&fit=crop'
            }
          ],
          tips: 'Approachable yet professional for client relations and networking',
          skinMatch: ['medium', 'olive', 'dark', 'deep'],
          confidence: 91
        }
      ]
    };

    const outfits = gender === 'girl' ? girlOutfits : boyOutfits;
    
    if (category === 'all') {
      return Object.values(outfits).flat().filter(outfit => 
        outfit.skinMatch.includes(skinTone)
      );
    }
    
    return (outfits[category] || []).filter(outfit => 
      outfit.skinMatch.includes(skinTone)
    );
  }, []);

  const loadOutfitSuggestions = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockSuggestions = generateMockOutfits(selectedGender, selectedCategory, selectedOccasion, selectedSkinTone);
      setOutfitSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 1000);
  }, [selectedGender, selectedCategory, selectedOccasion, selectedSkinTone, generateMockOutfits]);

  useEffect(() => {
    if (selectedGender) {
      loadOutfitSuggestions();
    }
  }, [selectedGender, loadOutfitSuggestions]);

  const copyColors = (colors) => {
    const colorText = colors.join(', ');
    navigator.clipboard.writeText(colorText);
  };

  const downloadOutfit = (outfit) => {
    const data = {
      title: outfit.title,
      colors: outfit.colors,
      description: outfit.description,
      items: outfit.items.map(item => ({
        name: item.name,
        type: item.type,
        color: item.color
      })),
      tips: outfit.tips,
      confidence: outfit.confidence
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${outfit.title.replace(/\s+/g, '_')}_outfit.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return '#10B981';
    if (confidence >= 80) return '#F59E0B';
    return '#EF4444';
  };

  if (!selectedGender) {
    return (
      <div className="dress-colors">
        <div className="dress-colors-container">
          <header className="dress-colors-header">
            <h1 className="dress-colors-title">Perfect Outfit Colors 👗</h1>
            <p className="dress-colors-subtitle">
              Discover the perfect color combinations for your outfits
            </p>
          </header>

          <div className="gender-selection">
            <h2 className="selection-title">Who are we styling today?</h2>
            <div className="gender-options">
              {genderOptions.map(option => (
                <button
                  key={option.id}
                  className={`gender-card ${option.theme}`}
                  onClick={() => setSelectedGender(option.id)}
                >
                  <div className="gender-icon">{option.icon}</div>
                  <h3 className="gender-label">{option.label}</h3>
                  <p className="gender-description">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTheme = selectedGender === 'girl' ? 'feminine' : 'masculine';

  return (
    <div className={`dress-colors ${currentTheme}`}>
      <div className="dress-colors-container">
        <header className="dress-colors-header">
          <button 
            className="back-btn"
            onClick={() => setSelectedGender(null)}
          >
            ← Back to Selection
          </button>
          <h1 className="dress-colors-title">
            {selectedGender === 'girl' ? '👩 Girls Fashion Colors' : '👨 Boys Fashion Colors'}
          </h1>
          <p className="dress-colors-subtitle">
            Perfect color combinations for {selectedGender === 'girl' ? 'feminine' : 'masculine'} outfits
          </p>
        </header>

        {/* Preferences Section */}
        <div className="preferences-section">
          <h3 className="preferences-title">Customize Your Style</h3>
          <div className="preferences-grid">
            <div className="preference-group">
              <label className="preference-label">Occasion</label>
              <select 
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="preference-select"
              >
                {occasions.map(occasion => (
                  <option key={occasion.id} value={occasion.id}>
                    {occasion.icon} {occasion.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="preference-group">
              <label className="preference-label">Skin Tone</label>
              <div className="skin-tone-options">
                {skinTones.map(tone => (
                  <button
                    key={tone.id}
                    className={`skin-tone-btn ${selectedSkinTone === tone.id ? 'active' : ''}`}
                    style={{ backgroundColor: tone.color }}
                    onClick={() => setSelectedSkinTone(tone.id)}
                    title={tone.name}
                  >
                    {selectedSkinTone === tone.id && '✓'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-section">
          <div className="category-grid">
            {getCategories(selectedGender).map(category => (
              <button
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Outfit Suggestions */}
        <div className="outfits-section">
          {isLoading ? (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>Finding perfect outfits for you...</p>
            </div>
          ) : (
            <div className="outfits-grid">
              {outfitSuggestions.map(outfit => (
                <div key={outfit.id} className="outfit-card">
                  <div className="outfit-header">
                    <h3 className="outfit-title">{outfit.title}</h3>
                    <div className="confidence-badge">
                      <span 
                        className="confidence-dot"
                        style={{ backgroundColor: getConfidenceColor(outfit.confidence) }}
                      ></span>
                      {outfit.confidence}% match
                    </div>
                  </div>
                  
                  <div className="color-palette">
                    {outfit.colors.map((color, index) => (
                      <div
                        key={index}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        onClick={() => navigator.clipboard.writeText(color)}
                        title={`${color} - Click to copy`}
                      >
                        <span className="color-code">{color}</span>
                      </div>
                    ))}
                  </div>

                  <p className="outfit-description">{outfit.description}</p>
                  
                  <div className="outfit-items">
                    <h4>Outfit Items:</h4>
                    <ul className="items-list">
                      {outfit.items.map((item, index) => (
                        <li key={index} className="outfit-item">{item.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="styling-tips">
                    <strong>Styling Tip:</strong> {outfit.tips}
                  </div>

                  <div className="outfit-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => copyColors(outfit.colors)}
                      title="Copy all colors"
                    >
                      📋 Copy Colors
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setSelectedOutfit(outfit)}
                      title="View details"
                    >
                      👁️ View Details
                    </button>
                    <button 
                      className="btn btn-accent"
                      onClick={() => downloadOutfit(outfit)}
                      title="Download outfit"
                    >
                      💾 Save Outfit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {outfitSuggestions.length === 0 && !isLoading && (
            <div className="empty-state">
              <h3>No outfits found</h3>
              <p>Try adjusting your preferences or selecting a different category.</p>
            </div>
          )}
        </div>

        {/* Enhanced Outfit Detail Modal with Images */}
        {selectedOutfit && (
          <div className="modal-overlay" onClick={() => setSelectedOutfit(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedOutfit.title}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedOutfit(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="modal-body">
                <div className="large-color-palette">
                  {selectedOutfit.colors.map((color, index) => (
                    <div
                      key={index}
                      className="large-color-swatch"
                      style={{ backgroundColor: color }}
                      onClick={() => navigator.clipboard.writeText(color)}
                    >
                      <span className="large-color-code">{color}</span>
                    </div>
                  ))}
                </div>
                
                <div className="outfit-details">
                  <div className="detail-section">
                    <h3>Description</h3>
                    <p>{selectedOutfit.description}</p>
                  </div>
                  
                  {/* Enhanced Outfit Items with Images */}
                  <div className="detail-section">
                    <h3>Complete Outfit with Visual References</h3>
                    <div className="outfit-items-with-images">
                      {selectedOutfit.items.map((item, index) => (
                        <div key={index} className="outfit-item-card">
                          <div className="item-image-container">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="item-image"
                              loading="lazy"
                            />
                            <div className="item-color-indicator" style={{ backgroundColor: item.color }}></div>
                          </div>
                          <div className="item-details">
                            <h4 className="item-name">{item.name}</h4>
                            <p className="item-type">{item.type}</p>
                            <div className="item-color-info">
                              <span className="color-hex">{item.color}</span>
                              <div 
                                className="color-preview" 
                                style={{ backgroundColor: item.color }}
                                onClick={() => navigator.clipboard.writeText(item.color)}
                                title="Click to copy color"
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h3>Styling Tips</h3>
                    <p>{selectedOutfit.tips}</p>
                  </div>

                  <div className="detail-section">
                    <h3>Match Score</h3>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill"
                        style={{ 
                          width: `${selectedOutfit.confidence}%`,
                          backgroundColor: getConfidenceColor(selectedOutfit.confidence)
                        }}
                      ></div>
                    </div>
                    <p>{selectedOutfit.confidence}% - Based on color harmony and skin tone compatibility</p>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => copyColors(selectedOutfit.colors)}
                >
                  📋 Copy All Colors
                </button>
                <button 
                  className="btn btn-accent"
                  onClick={() => downloadOutfit(selectedOutfit)}
                >
                  💾 Download Outfit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DressColors;