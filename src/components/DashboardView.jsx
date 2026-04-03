import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowTrendUp, 
  faArrowTrendDown, 
  faWallet, 
} from '@fortawesome/free-solid-svg-icons';

import { motion } from 'framer-motion';
import { INITIAL_BALANCE } from '../data/mockData';
import StatCard from './StatCard';
import MarketPositionChart from './MarketPositionChart';
import DistributionChart from './DistributionChart';

const formatCurrency = (val) => {
  if (val >= 10000000) return `₹${(val/10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val/100000).toFixed(2)} Lac`;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

const DashboardView = ({ transactions, chartData, categoryData, timeframe, setTimeframe }) => {
  const totalBalance = transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, INITIAL_BALANCE);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  const stats = [
    { label: 'Total Balance', value: totalBalance, icon: <FontAwesomeIcon icon={faWallet} />, active: true, change: '+2.5%' },
    { label: 'Income', value: totalIncome, icon: <FontAwesomeIcon icon={faArrowTrendUp} />, active: false, change: '+12.3%' },
    { label: 'Expenses', value: totalExpenses, icon: <FontAwesomeIcon icon={faArrowTrendDown} />, active: false, change: '-4.1%' },
  ];

  const COLORS = ['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#ec4899'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <StatCard 
            key={i}
            {...stat}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketPositionChart 
          chartData={chartData} 
          timeframe={timeframe} 
          setTimeframe={setTimeframe} 
        />
        <DistributionChart 
          categoryData={categoryData} 
          colors={COLORS} 
          formatCurrency={formatCurrency} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Volatility', value: categoryData[0]?.name || 'N/A', sub: formatCurrency(categoryData[0]?.value), icon: <FontAwesomeIcon icon={faArrowTrendUp} />, color: 'var(--brand-accent)' },
          { title: 'Threshold', value: '75%', sub: '2.5L Remaining', icon: <FontAwesomeIcon icon={faWallet} />, color: 'var(--glow-green)' },
          { title: 'Schedule', value: 'Active', sub: 'Due tomorrow', icon: <FontAwesomeIcon icon={faArrowTrendDown} />, color: 'var(--glow-orange)' }
        ].map((insight, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-5 p-6 glass-panel rounded-3xl group"
          >
            <div className="p-3 rounded-2xl transition-colors duration-300" style={{ backgroundColor: `${insight.color}15`, color: insight.color }}>
              {insight.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] tracking-wide">{insight.title}</p>
              <h4 className="text-base font-black text-[var(--text-main)]">{insight.value}</h4>
              <p className="text-xs font-medium text-[var(--text-muted)] mt-0.5">{insight.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
