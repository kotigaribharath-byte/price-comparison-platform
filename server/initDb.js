const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath);

const products = [
    {
        id: 'iphone-15',
        name: 'Apple iPhone 15 (128GB) - Black',
        imageUrl: 'https://m.media-amazon.com/images/I/71657UrqKnL._SX679_.jpg',
        description: 'The latest iPhone featuring the Dynamic Island, 48MP Main camera, and USB-C.',
        amazonPrice: 71490,
        flipkartPrice: 70999,
        amazonUrl: 'https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX2F5QT',
        flipkartUrl: 'https://www.flipkart.com/apple-iphone-15-black-128-gb/p/itm6bc647548a1d6',
        specs: JSON.stringify(['6.1-inch Super Retina XDR display', 'A16 Bionic chip with 5-core GPU', '48MP Main + 12MP Ultra Wide camera', 'USB-C Interface', 'All-day battery life (up to 20h video)'])
    },
    {
        id: 's24-ultra',
        name: 'Samsung Galaxy S24 Ultra (256GB Platinum)',
        imageUrl: 'https://m.media-amazon.com/images/I/71RVuS3q9LS._SX679_.jpg',
        description: 'Elite smartphone with Galaxy AI, Titanium frame, and 200MP camera system.',
        amazonPrice: 129999,
        flipkartPrice: 128500,
        amazonUrl: 'https://www.amazon.in/Samsung-Galaxy-Ultra-Digital-Titanium/dp/B0CS5X6B6M',
        flipkartUrl: 'https://www.flipkart.com/samsung-galaxy-s24-ultra-titanium-gray-256-gb/p/itmae7d605177267',
        specs: JSON.stringify(['6.8-inch QHD+ Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3 for Galaxy', '200MP Quad Telephoto System', 'Integrated S Pen', 'Titanium Frame'])
    },
    {
        id: 'macbook-m3',
        name: 'Apple MacBook Air M3 (13-inch, 2024)',
        imageUrl: 'https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg',
        description: 'Thinner, lighter, and faster laptop with the powerful M3 chip.',
        amazonPrice: 114900,
        flipkartPrice: 113500,
        amazonUrl: 'https://www.amazon.in/Apple-2024-MacBook-13-inch-Laptop/dp/B0CX27R79R',
        flipkartUrl: 'https://www.flipkart.com/apple-macbook-air-m3-8-gb-256-gb-ssd-macos-sonoma-mryu3hn-a/p/itm77c6178822502',
        specs: JSON.stringify(['M3 chip with 8-core CPU/8-core GPU', '13.6-inch Liquid Retina display', '8GB Unified Memory, 256GB SSD', 'Up to 18 hours battery life', '1080p FaceTime HD camera'])
    },
    {
        id: 'sony-xm5',
        name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
        imageUrl: 'https://m.media-amazon.com/images/I/516V7S6A8JL._SX679_.jpg',
        description: 'Industry-leading noise cancellation with exceptional sound quality.',
        amazonPrice: 29990,
        flipkartPrice: 28990,
        amazonUrl: 'https://www.amazon.in/Sony-WH-1000XM5-Wireless-Cancelling-Headphones/dp/B0B5GHX679',
        flipkartUrl: 'https://www.flipkart.com/sony-wh-1000xm5-industry-leading-noise-cancelling-headphones-30-hr-battery-bluetooth-headset/p/itm8d408f6578a1f',
        specs: JSON.stringify(['Multiple noise sensor technology', 'Integrated Processor V1', '30-hour battery life (Quick Charge)', 'Precise Voice Pickup technology', 'Smart listening features'])
    },
    {
        id: 'ipad-air',
        name: 'Apple iPad Air M2 (11-inch, 128GB)',
        imageUrl: 'https://m.media-amazon.com/images/I/61SNAmpxMGL._SX679_.jpg',
        description: 'Powerful and versatile tablet for creativity and productivity.',
        amazonPrice: 59900,
        flipkartPrice: 58490,
        amazonUrl: 'https://www.amazon.in/Apple-iPad-Air-11-inch-Wi-Fi-128GB/dp/B0D3JN8QY3',
        flipkartUrl: 'https://www.flipkart.com/apple-ipad-air-m2-128-gb-rom-11-inch-with-wi-fi-blue/p/itm234674720612d',
        specs: JSON.stringify(['11-inch Liquid Retina display', 'Apple M2 chip', '12MP Landscape Ultra Wide front camera', 'Apple Pencil Pro compatible', 'USB-C charging'])
    },
    {
        id: 'dell-xps',
        name: 'Dell XPS 13 Laptop (9340)',
        imageUrl: 'https://m.media-amazon.com/images/I/61O+Uu0iJ5L._SX679_.jpg',
        description: 'The ultimate portable powerhouse with the latest Intel processors.',
        amazonPrice: 139990,
        flipkartPrice: 137500,
        amazonUrl: 'https://www.amazon.in/Dell-XPS-9340-Ultra-5-125H-33-02cm/dp/B0D1XMKMSH',
        flipkartUrl: 'https://www.flipkart.com/dell-xps-13-intel-core-ultra-5-16-gb-512-gb-ssd-windows-11-home-9340-laptop/p/itmd7549887754fb',
        specs: JSON.stringify(['Intel Core Ultra 5-125H Processor', '13.4-inch FHD+ InfinityEdge display', '16GB LPDDR5x RAM, 512GB SSD', 'Intel Arc Graphics', 'Machined Aluminum Chassis'])
    },
    {
        id: 'ps5-slim',
        name: 'Sony PlayStation 5 Slim (CFI-2000)',
        imageUrl: 'https://m.media-amazon.com/images/I/41mbiBwTojL._SY445_SX342_.jpg',
        description: 'Unleash new gaming possibilities with the thinner PS5 model.',
        amazonPrice: 54990,
        flipkartPrice: 53990,
        amazonUrl: 'https://www.amazon.in/Sony-PlayStation-5-Console-Slim/dp/B0D1YF8BCC',
        flipkartUrl: 'https://www.flipkart.com/sony-ps5-slim-cfi-2000-console-disc-edition-1-tb/p/itm3d7549887754fb',
        specs: JSON.stringify(['1TB Ultra-High Speed SSD', 'Integrated I/O with Ray Tracing', '4K-TV Gaming support', 'Haptic Feedback via DualSense', 'Slimmer design with Disc Drive'])
    },
    {
        id: 'canon-r50',
        name: 'Canon EOS R50 Mirrorless Camera',
        imageUrl: 'https://m.media-amazon.com/images/I/61N60-6H6kL._SX679_.jpg',
        description: 'Compact mirrorless camera for capturing sharp photos and 4K videos.',
        amazonPrice: 71990,
        flipkartPrice: 70500,
        amazonUrl: 'https://www.amazon.in/Canon-R50-Mirrorless-Camera-18-45mm/dp/B0BW6G2YQ7',
        flipkartUrl: 'https://www.flipkart.com/canon-eos-r50-mirrorless-camera-body-with-18-45-mm-lens/p/itma7c6178822502',
        specs: JSON.stringify(['24.2 MP APS-C CMOS sensor', 'DIGIC X Image Processor', '4K Uncropped 30p video', 'Dual Pixel CMOS AF II', 'Compact and lightweight design'])
    },
    {
        id: 'amazfit-gtr4',
        name: 'Amazfit GTR 4 Smart Watch',
        imageUrl: 'https://m.media-amazon.com/images/I/61j6X2f72BL._SX679_.jpg',
        description: 'Sports health tracker with dual-band GPS and 14-day battery.',
        amazonPrice: 16999,
        flipkartPrice: 15999,
        amazonUrl: 'https://www.amazon.in/Amazfit-GTR-Smartwatch-Dual-band-Storage/dp/B0BBFMG9V3',
        flipkartUrl: 'https://www.flipkart.com/amazfit-gtr-4-smartwatch-1-43-inch-amoled-display-dual-band-gps-150-sports-modes/p/itm3d7549887754fb',
        specs: JSON.stringify(['1.43" AMOLED display', 'Dual-band circular-polarized GPS', 'BioTracker 4.0 PPG Biometric Sensor', '14-day battery life', '150+ Sports Modes'])
    },
    {
        id: 'bose-qc-ultra',
        name: 'Bose QuietComfort Ultra Earbuds',
        imageUrl: 'https://m.media-amazon.com/images/I/51w7pM9jKJL._SX679_.jpg',
        description: 'The ultimate noise-cancelling earbuds with world-class performance.',
        amazonPrice: 25900,
        flipkartPrice: 24500,
        amazonUrl: 'https://www.amazon.in/Bose-QuietComfort-Ultra-Bluetooth-Earbuds-Cancelling/dp/B0CH2S6B8N',
        flipkartUrl: 'https://www.flipkart.com/bose-quietcomfort-ultra-earbuds-world-class-noise-cancelling-spatial-audio-bluetooth-headset/p/itm3d7549887754fb',
        specs: JSON.stringify(['CustomTune technology', 'World-class noise cancellation', 'Spatial Audio (Immersive Audio)', '6-hour battery life (24h with case)', 'SimpleTouch controls'])
    }
];

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        imageUrl TEXT,
        description TEXT,
        amazonPrice REAL,
        flipkartPrice REAL,
        amazonUrl TEXT,
        flipkartUrl TEXT,
        specs TEXT
    )`);

    const stmt = db.prepare(`INSERT OR REPLACE INTO products (id, name, imageUrl, description, amazonPrice, flipkartPrice, amazonUrl, flipkartUrl, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    products.forEach(p => {
        stmt.run(p.id, p.name, p.imageUrl, p.description, p.amazonPrice, p.flipkartPrice, p.amazonUrl, p.flipkartUrl, p.specs);
    });

    stmt.finalize();
    console.log('Database initialized and seeded with 10 products.');
});

db.close();
