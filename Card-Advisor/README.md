# Card Advisor

A React-based web application that helps users find the perfect credit card based on their spending patterns, income, and preferences.

## Features

- **Smart Card Recommendations**: Get personalized credit card suggestions based on your spending habits
- **Detailed Spending Analysis**: Input your monthly spending across 14 different categories
- **Advanced Filtering**: Filter cards by type, annual fee, credit score, and rewards type
- **User Type Selection**: Choose between normal and advanced user experiences
- **Real-time Calculations**: See how much cashback or rewards you could earn

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: CSS3 with modern design principles
- **Currency Input**: react-currency-input-field
- **Routing**: React Router
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Card-Advisor.git
cd Card-Advisor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Deployment

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Automatic Deployment

The app is configured with GitHub Actions for automatic deployment. Simply push to the `main` branch and the app will be automatically deployed to GitHub Pages.

## Project Structure

```
src/
├── components/          # React components
│   ├── AppPage.jsx     # Main app page with user interface
│   ├── HomePage.jsx    # Landing page
│   ├── Sidebar.jsx     # Filter sidebar
│   ├── SpendingAccordion.jsx  # Spending input section
│   ├── CreditsAccordion.jsx   # Credits input section
│   ├── ResultsSection.jsx     # Results display
│   └── UserTypeModal.jsx      # User type selection modal
├── data/               # Static data
│   └── data.json      # Credit card data
├── services/          # Business logic
│   └── calculateSingleCard.ts  # Card calculation service
├── types/             # TypeScript type definitions
│   └── Query.ts       # Query type definition
├── util/              # Utility functions
│   └── annualizeSpending.ts   # Spending annualization
└── App.jsx            # Main app component
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Live Demo

Visit the live application at: [https://yourusername.github.io/Card-Advisor](https://yourusername.github.io/Card-Advisor)
