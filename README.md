# 🚀 Premium Finance Dashboard (CRED Inspired)

A high-performance, responsive financial dashboard built for the modern treasury. This application features a sleek dark-mode aesthetic with glassmorphic panels, neon accents, and robust role-based functionality.

## ✨ Features

### 🏦 Dashboard Overview
- **Dynamic Stats**: Real-time tracking of Total Balance, Income, and Expenses.
*   **Market Position Viz**: Interactive line chart showing 30-day and 6-month balance trends.
- **Capital Distribution**: Categorical breakdown of spending via a premium donut chart.

### 📝 Financial Records (Transactions)
- **High-Density Table**: Clean, legible list of all financial activity.
- **Paging System**: Optimized for performance with 10 records per page.
- **Global Search**: Instant search by description or category.
- **Advanced Filters**: Filter by transaction type (Income/Expense) or Category.

### 🔐 Institutional Oversight (RBAC)
- **Administrator Mode**:
  - Full CRUD operations (Add, Edit, Delete records).
  - Specialized Edit modal with validation.
- **User Mode**:
  - Read-only access to all financial data and insights.
- **Toggle**: Switch roles instantly via the header toggle for demonstration.

### 🧠 Algorithmic Insights
- **Wealth Velocity**: Predictive analysis of net worth goals.
- **Spending Burn Rate**: Comparative analysis of daily expenditures.
- **Portfolio Optimization**: Visual progress bars showing capital allocation strategy.

### 🎨 Design & Experience
- **CRED Aesthetic**: Deep charcoal backgrounds with vibrant neon orange and green glows.
- **Glassmorphism**: Sophisticated backdrop-blur effects and 1px borders.
- **Micro-Animations**: Powered by `Framer Motion` for smooth tab transitions and layout changes.
- **Persistence**: `localStorage` integration keeps your theme and transactions saved.

## 🛠️ Technology Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: native JS Date optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/components/`: Modular UI components (StatCard, MarketPositionChart, etc.)
- `src/data/`: Mock data engine and storage logic.
- `src/App.jsx`: Main application shell and state orchestrator.
- `src/index.css`: Design system tokens and glassmorphic utilities.

---
*Built with ❤️ for the Frontend Evaluation Assignment.*
