# Price Comparison Platform

## Overview
The Price Comparison Platform is a web application designed to compare prices of products from Amazon and Flipkart. It features a modern, elegant dark-themed dashboard that allows users to easily view and compare prices from both platforms.

## Features
- **Price Comparison**: Fetches and displays product prices from Amazon and Flipkart.
- **Dark Theme**: A visually appealing dark-themed interface for a modern user experience.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-time Data**: Fetches the latest prices from the respective APIs.

## Project Structure
```
price-comparison-platform
├── src
│   ├── app.ts
│   ├── components
│   │   ├── Dashboard.tsx
│   │   └── PriceCard.tsx
│   ├── pages
│   │   └── Comparison.tsx
│   ├── services
│   │   ├── amazonService.ts
│   │   └── flipkartService.ts
│   ├── styles
│   │   └── darkTheme.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/price-comparison-platform.git
   ```
2. Navigate to the project directory:
   ```
   cd price-comparison-platform
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.