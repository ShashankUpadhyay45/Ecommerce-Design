export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 12 },
  { id: 'audio', name: 'Audio & Sound', icon: 'Headphones', count: 3 },
  { id: 'smart-tech', name: 'Smart Tech', icon: 'Watch', count: 3 },
  { id: 'sneakers', name: 'Sneakers & Kicks', icon: 'Footprints', count: 3 },
  { id: 'apparel', name: 'Apex Apparel', icon: 'Shirt', count: 3 },
];

export const BRANDS = ['NOVA Labs', 'AeroKicks', 'SoundSphere', 'Chronos', 'CyberShield', 'Veloce'];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Apex Pro Spatial Noise-Canceling Headphones',
    category: 'audio',
    brand: 'NOVA Labs',
    price: 299,
    originalPrice: 380,
    rating: 4.9,
    reviewCount: 328,
    badge: 'BESTSELLER',
    badgeColor: 'bg-amber-500',
    inStock: true,
    stockLeft: 4,
    description: 'Engineered with custom beryllium acoustic drivers, real-time spatial audio head-tracking, and military-grade hybrid active noise cancellation for a truly transcendent auditory landscape.',
    specs: [
      { label: 'Battery Life', value: '45 Hours (Fast Charge 10m = 5h)' },
      { label: 'Drivers', value: '40mm Custom Beryllium' },
      { label: 'Connectivity', value: 'Bluetooth 5.4 & Lossless USB-C' },
      { label: 'Weight', value: '258g Ultralight Magnesium Alloy' }
    ],
    colors: [
      { name: 'Midnight Onyx', hex: '#0f172a', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
      { name: 'Cyber Silver', hex: '#cbd5e1', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80' },
      { name: 'Cosmic Indigo', hex: '#6366f1', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['Standard Over-Ear', 'Pro Memory Cushions'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    dealOfTheDay: true,
    dealEndsInHours: 7,
    reviews: [
      { user: 'Alexander Wright', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', rating: 5, date: '2 days ago', comment: 'The soundstage is mind-blowing. Noise cancellation effortlessly silences train and office clatter.', verified: true },
      { user: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80', rating: 5, date: '1 week ago', comment: 'Worth every penny. The build quality in magnesium alloy feels like a luxury Swiss watch.', verified: true }
    ]
  },
  {
    id: 'prod-2',
    name: 'AeroStride Cyberknit High-Top Sneakers',
    category: 'sneakers',
    brand: 'AeroKicks',
    price: 185,
    originalPrice: 240,
    rating: 4.8,
    reviewCount: 215,
    badge: 'HOT DROP',
    badgeColor: 'bg-rose-500',
    inStock: true,
    stockLeft: 8,
    description: 'Seamless 3D-knitted aerodynamic upper bonded with energy-returning nitrogen-infused foam midsole. Built for both high-octane city sprint and futuristic runway aesthetics.',
    specs: [
      { label: 'Cushioning', value: 'Nitrogen Supercritical Foam' },
      { label: 'Upper', value: 'Adaptive 3D Matrix CyberKnit' },
      { label: 'Outsole', value: 'Multi-directional Grip Rubber' },
      { label: 'Drop', value: '8mm Ergonomic Offset' }
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111827', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80' },
      { name: 'Neon Accent', hex: '#10b981', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80' },
      { name: 'Arctic White', hex: '#f8fafc', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['US 7.5', 'US 8.5', 'US 9.5', 'US 10.5', 'US 11.5', 'US 12'],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    dealOfTheDay: false,
    reviews: [
      { user: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80', rating: 5, date: '3 days ago', comment: 'Lightest sneakers I have ever owned. The bounce is unreal!', verified: true }
    ]
  },
  {
    id: 'prod-3',
    name: 'Chronos Ultra Titanium Smartwatch (Gen 4)',
    category: 'smart-tech',
    brand: 'Chronos',
    price: 449,
    originalPrice: 550,
    rating: 4.95,
    reviewCount: 480,
    badge: 'PREMIUM',
    badgeColor: 'bg-indigo-600',
    inStock: true,
    stockLeft: 3,
    description: 'Aerospace Grade-5 Titanium chassis with sapphire crystal AMOLED display. Features real-time ECG, continuous blood oxygen tracking, offline topographic maps, and 14-day endurance battery.',
    specs: [
      { label: 'Display', value: '1.43" Sapphire AMOLED 2000 nits' },
      { label: 'Sensors', value: 'Dual-Frequency GPS, ECG, BioTracker 5.0' },
      { label: 'Water Rating', value: '10 ATM (100m Dive Proof)' },
      { label: 'Battery', value: 'Up to 14 Days on Single Charge' }
    ],
    colors: [
      { name: 'Raw Titanium', hex: '#94a3b8', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
      { name: 'Space Black', hex: '#18181b', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['42mm Case', '46mm Case'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    dealOfTheDay: false,
    reviews: [
      { user: 'Dr. Evelyn Reed', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80', rating: 5, date: 'Yesterday', comment: 'Battery lasts nearly two full weeks. The sapphire glass has not caught a single scratch.', verified: true }
    ]
  },
  {
    id: 'prod-4',
    name: 'CyberShield Weatherproof Modular Parka',
    category: 'apparel',
    brand: 'CyberShield',
    price: 260,
    originalPrice: 340,
    rating: 4.7,
    reviewCount: 164,
    badge: 'LIMITED EDITION',
    badgeColor: 'bg-purple-600',
    inStock: true,
    stockLeft: 6,
    description: 'Triple-layer GORE-TECH membrane with magnetic Fidlock hardware, detachable storm hood, and internal sling strap system for thermal adaptability across zero-degree commutes.',
    specs: [
      { label: 'Waterproof', value: '25,000mm Hydrostatic Head' },
      { label: 'Hardware', value: 'German Fidlock Magnetic Buckles' },
      { label: 'Lining', value: 'Primaloft Bio Recycled Insulation' },
      { label: 'Pockets', value: '7 Concealed Weatherproof Zips' }
    ],
    colors: [
      { name: 'Obsidian Dark', hex: '#020617', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80' },
      { name: 'Cyber Olive', hex: '#3f6212', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    dealOfTheDay: false,
    reviews: [
      { user: 'Liam Gallagher', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80', rating: 5, date: '4 days ago', comment: 'Tested in torrential rain. Completely dry inside and looks extremely sharp.', verified: true }
    ]
  },
  {
    id: 'prod-5',
    name: 'SoundSphere 360 Glass Ambient Speaker',
    category: 'audio',
    brand: 'SoundSphere',
    price: 340,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 189,
    badge: 'SALE -20%',
    badgeColor: 'bg-emerald-600',
    inStock: true,
    stockLeft: 12,
    description: 'Vibrating organic glass cylinder emitting crisp omnidirectional sound with warm atmospheric LED tube lighting synchronized with acoustic pulses.',
    specs: [
      { label: 'Audio', value: '360° Omnidirectional 65W Output' },
      { label: 'Lighting', value: '32-Step Candlelight & RGB Sync' },
      { label: 'Battery', value: '18 Hours Continuous Playback' }
    ],
    colors: [
      { name: 'Smoked Glass', hex: '#334155', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80' },
      { name: 'Crystal Clear', hex: '#e2e8f0', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['Compact Edition', 'Studio 360 Edition'],
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80'
    ],
    featured: false,
    dealOfTheDay: false,
    reviews: []
  },
  {
    id: 'prod-6',
    name: 'Pulse Neo Wireless Low-Latency Gaming Earbuds',
    category: 'audio',
    brand: 'NOVA Labs',
    price: 139,
    originalPrice: 199,
    rating: 4.6,
    reviewCount: 310,
    badge: 'NEW',
    badgeColor: 'bg-cyan-500',
    inStock: true,
    stockLeft: 15,
    description: 'Ultra-low 20ms latency wireless earbuds with RGB magnetic charging dock, 4-mic ENC noise cancellation, and customized sound profiles.',
    specs: [
      { label: 'Latency', value: '20ms Ultra-Low 2.4GHz Dongle + BT 5.3' },
      { label: 'Microphone', value: 'Quad-mic Beamforming ENC' },
      { label: 'Playtime', value: '36 Hours with Charging Case' }
    ],
    colors: [
      { name: 'Cyber White', hex: '#ffffff', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80' },
      { name: 'Neon Black', hex: '#1e1b4b', image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['Standard + 3 Gel Tip Sets'],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80'
    ],
    featured: false,
    dealOfTheDay: false,
    reviews: []
  },
  {
    id: 'prod-7',
    name: 'Nova Veloce Carbon Plated Marathon Racers',
    category: 'sneakers',
    brand: 'Veloce',
    price: 215,
    originalPrice: 280,
    rating: 4.9,
    reviewCount: 142,
    badge: 'POPULAR',
    badgeColor: 'bg-orange-500',
    inStock: true,
    stockLeft: 5,
    description: 'Propulsive full-length curved carbon fiber plate nestled within dual-density Pebax superfoam. Slashes seconds off your personal best.',
    specs: [
      { label: 'Plate', value: 'Curved High-Modulus Carbon Fiber' },
      { label: 'Weight', value: '185g (Men Size 9)' },
      { label: 'Stack Height', value: '39.5mm Race Legal' }
    ],
    colors: [
      { name: 'Hyper Orange', hex: '#f97316', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80' },
      { name: 'Volt Green', hex: '#84cc16', image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11'],
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&auto=format&fit=crop&q=80'
    ],
    featured: false,
    dealOfTheDay: false,
    reviews: []
  },
  {
    id: 'prod-8',
    name: 'Phantom Matrix Minimalist Streetwear Lows',
    category: 'sneakers',
    brand: 'AeroKicks',
    price: 155,
    originalPrice: 190,
    rating: 4.7,
    reviewCount: 98,
    badge: 'NEW',
    badgeColor: 'bg-blue-600',
    inStock: true,
    stockLeft: 10,
    description: 'Italian calfskin leather meets translucent gum sole with Japanese industrial typography details. Effortless everyday luxury.',
    specs: [
      { label: 'Material', value: 'Full-Grain Tuscan Calfskin' },
      { label: 'Sole', value: 'Vulcanized Gum Rubber' },
      { label: 'Insole', value: 'Ortholite Memory Cushioning' }
    ],
    colors: [
      { name: 'Monochrome Chalk', hex: '#f1f5f9', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80' },
      { name: 'Midnight Charcoal', hex: '#334155', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=80'
    ],
    featured: false,
    dealOfTheDay: false,
    reviews: []
  },
  {
    id: 'prod-9',
    name: 'HoloLens Vision Pro AR HUD Smart Glasses',
    category: 'smart-tech',
    brand: 'NOVA Labs',
    price: 599,
    originalPrice: 750,
    rating: 4.9,
    reviewCount: 88,
    badge: 'INNOVATION',
    badgeColor: 'bg-cyan-600',
    inStock: false,
    stockLeft: 0,
    description: 'Micro-OLED heads-up display projected seamlessly into featherlight titanium prescription-ready frames. Real-time translation, GPS navigation, and gesture control.',
    specs: [
      { label: 'Optics', value: 'Dual 1080p Micro-OLED Waveguide' },
      { label: 'Weight', value: '48g Ultra-Slim Frame' },
      { label: 'Battery', value: '8h Active HUD, All-Day Standby' }
    ],
    colors: [
      { name: 'Dark Titanium', hex: '#1e293b', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['Regular Fit (52-19)', 'Wide Fit (55-20)'],
    images: [
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&auto=format&fit=crop&q=80'
    ],
    featured: false,
    dealOfTheDay: false,
    reviews: []
  },
  {
    id: 'prod-10',
    name: 'Aura Glow 75% Custom Mechanical Keyboard',
    category: 'smart-tech',
    brand: 'NOVA Labs',
    price: 189,
    originalPrice: 249,
    rating: 4.85,
    reviewCount: 420,
    badge: 'HOT',
    badgeColor: 'bg-rose-500',
    inStock: true,
    stockLeft: 7,
    description: 'CNC machined anodized aluminum body with gasket mount architecture, hot-swappable lubricated linear switches, and customized per-key south-facing RGB.',
    specs: [
      { label: 'Structure', value: 'Gasket Mounted with Poron Foam' },
      { label: 'Switches', value: 'Pre-lubed Nova Linear 45g' },
      { label: 'Connectivity', value: 'Tri-Mode (BT 5.1 / 2.4G / Type-C)' }
    ],
    colors: [
      { name: 'Cyberpunk Violet', hex: '#7c3aed', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80' },
      { name: 'Anodized Silver', hex: '#e2e8f0', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['75% Compact', '100% Full Size'],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80'
    ],
    featured: false,
    dealOfTheDay: false,
    reviews: []
  },
  {
    id: 'prod-11',
    name: 'AeroTech Minimalist Heavyweight Hoodie (500 GSM)',
    category: 'apparel',
    brand: 'CyberShield',
    price: 120,
    originalPrice: 150,
    rating: 4.8,
    reviewCount: 290,
    badge: 'ESSENTIAL',
    badgeColor: 'bg-slate-700',
    inStock: true,
    stockLeft: 14,
    description: 'Crafted from double-faced 500 GSM organic French terry cotton with structured oversized drop-shoulder silhouette and hidden kangaroo phone compartment.',
    specs: [
      { label: 'Material', value: '100% Organic 500 GSM French Terry' },
      { label: 'Fit', value: 'Modern Boxy Drop-Shoulder' },
      { label: 'Finishing', value: 'Pre-shrunk Vintage Garment Wash' }
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#374151', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80' },
      { name: 'Bone White', hex: '#f3f4f6', image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80'
    ],
    featured: false,
    dealOfTheDay: false,
    reviews: []
  },
  {
    id: 'prod-12',
    name: 'UrbanTactical Cargo Utility Modular Pants',
    category: 'apparel',
    brand: 'CyberShield',
    price: 145,
    originalPrice: 180,
    rating: 4.75,
    reviewCount: 112,
    badge: 'TRENDING',
    badgeColor: 'bg-emerald-600',
    inStock: true,
    stockLeft: 9,
    description: 'Ripstop Cordura fabric infused with 4-way stretch, waterproof zippers, articulated knee gussets, and quick-adjust magnetic webbing belt.',
    specs: [
      { label: 'Fabric', value: 'Cordura Ripstop with DWR Finish' },
      { label: 'Belt', value: 'Integrated Magnetic Quick-Release' },
      { label: 'Pockets', value: '6 Tactical Reinforced Modular Slots' }
    ],
    colors: [
      { name: 'Tactical Black', hex: '#0f172a', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80' },
      { name: 'Desert Dune', hex: '#a8a29e', image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80' }
    ],
    sizes: ['30W', '32W', '34W', '36W'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80'
    ],
    featured: false,
    dealOfTheDay: false,
    reviews: []
  }
];

export const PROMO_CODES = {
  'NOVA20': { discountPercent: 20, description: '20% Off Storewide' },
  'SAVE15': { discountPercent: 15, description: '15% Off VIP Member Savings' },
  'APEX10': { discountPercent: 10, description: '10% Off First Order' }
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Lead Industrial Designer, SF',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'The Apex Pro headphones changed my entire workflow. Sleek aesthetics combined with pristine lossless audio clarity. The checkout and delivery was blazing fast!',
    rating: 5,
    product: 'Apex Pro Headphones',
    verified: true
  },
  {
    id: 2,
    name: 'David Zhao',
    role: 'Tech Entrepreneur & Runner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'The Chronos Ultra Titanium smartwatch has replaced my mechanical luxury watch. Tracking accuracy is top tier and the titanium finish is pure art.',
    rating: 5,
    product: 'Chronos Ultra Watch',
    verified: true
  },
  {
    id: 3,
    name: 'Maya Lin',
    role: 'Creative Director, Tokyo',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    content: 'NOVA represents the future of design-forward tech apparel. The quality of materials and attention to micro-details are unmatched anywhere else.',
    rating: 5,
    product: 'CyberShield Parka',
    verified: true
  }
];

