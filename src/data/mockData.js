import { subDays, format, startOfMonth, eachDayOfInterval } from 'date-fns';

export const INITIAL_BALANCE = 5500000;

const categories = [
  { id: 'food', name: 'Food & Dining', color: '#f59e0b' },
  { id: 'transport', name: 'Transportation', color: '#3b82f6' },
  { id: 'housing', name: 'Rent & Housing', color: '#ef4444' },
  { id: 'entertainment', name: 'Entertainment', color: '#8b5cf6' },
  { id: 'shopping', name: 'Shopping', color: '#ec4899' },
  { id: 'salary', name: 'Salary', color: '#10b981' },
  { id: 'investment', name: 'Investment', color: '#6366f1' },
  { id: 'healthcare', name: 'Healthcare', color: '#14b8a6' },
];

const generateTransactions = (count = 350) => {
  const transactions = [];
  const now = new Date();
  
  // Randomized salary payments for each month
  for (let m = 0; m < 6; m++) {
    // Offset salary by a random few days from start of month
    const offset = Math.floor(Math.random() * 5);
    const salaryDate = subDays(startOfMonth(subDays(now, m * 30)), -offset);
    
    // Vary salary amount slightly (within +/- 3%)
    const baseSalary = 145000;
    const variation = baseSalary * (0.03 * (Math.random() - 0.5));
    
    transactions.push({
      id: `salary-${m}`,
      date: format(salaryDate, 'yyyy-MM-dd'),
      amount: Math.round(baseSalary + variation),
      category: 'Salary',
      type: 'income',
      description: `Monthly Salary Payment - ${format(salaryDate, 'MMMM')}`
    });
  }

  // Random expenses and incomes over 6 months (~180 days)
  for (let i = 1; i < count; i++) {
    const isIncome = Math.random() < 0.08;
    const categoryIdx = Math.floor(Math.random() * (categories.length - 2));
    const categoryObj = categories[categoryIdx];
    
    let category, amount;
    if (isIncome) {
      category = Math.random() > 0.6 ? 'Investment' : 'Bonus';
      amount = Math.floor(Math.random() * 25000) + 2000;
    } else {
      category = categoryObj.name;
      // Vary costs by category type
      if (category === 'Rent & Housing') amount = Math.floor(Math.random() * 2000) + 15000;
      else if (category === 'Food & Dining') amount = Math.floor(Math.random() * 2500) + 150;
      else amount = Math.floor(Math.random() * 10000) + 100;
    }
    
    transactions.push({
      id: `tx-${i}`,
      date: format(subDays(now, Math.floor(Math.random() * 180)), 'yyyy-MM-dd'),
      amount: amount,
      category,
      type: isIncome ? 'income' : 'expense',
      description: `Payment for ${category}`
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const MOCK_TRANSACTIONS = generateTransactions(400);

export const getChartData = (transactions, days = 30) => {
  const timeframe = eachDayOfInterval({
    start: subDays(new Date(), days - 1),
    end: new Date()
  });

  let runningBalance = INITIAL_BALANCE; // Starting baseline
  
  // Calculate initial baseline balance before the timeframe starts
  const transactionsBeforeTimeframe = transactions.filter(t => new Date(t.date) < timeframe[0]);
  const historicalImpact = transactionsBeforeTimeframe.reduce((acc, t) => 
    t.type === 'income' ? acc + t.amount : acc - t.amount, 0
  );
  runningBalance += historicalImpact;

  return timeframe.map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayTransactions = transactions.filter(t => t.date === dateStr);
    
    const income = dayTransactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc, 0);
    const expense = dayTransactions.reduce((acc, t) => t.type === 'expense' ? acc + t.amount : acc, 0);
    
    runningBalance = runningBalance + income - expense;

    return {
      name: days > 60 ? format(date, 'MMM d') : format(date, 'MMM dd'),
      balance: runningBalance,
      income,
      expense
    };
  });
};

export const getCategoryData = (transactions) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  return Object.entries(totals).map(([name, value]) => ({
    name,
    value,
    color: categories.find(c => c.name === name)?.color || '#94a3b8'
  })).sort((a, b) => b.value - a.value);
};
