import { motion } from 'framer-motion';
import { 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const MarketPositionChart = ({ chartData, timeframe, setTimeframe }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 glass-panel rounded-3xl h-[450px]"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-[var(--text-main)]">Market Position</h3>
        <select 
          className="bg-[var(--border-light)] text-xs font-semibold px-4 py-2 rounded-xl border-none outline-none cursor-pointer text-[var(--text-main)]"
          value={timeframe}
          onChange={(e) => setTimeframe(Number(e.target.value))}
        >
          <option value={30}>Last 30 Days</option>
          <option value={180}>Last 6 Months</option>
        </select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-muted)" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
              minTickGap={40}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => val >= 100000 ? `${(val / 100000).toFixed(1)}L` : `${val / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--panel-bg)', 
                borderRadius: '16px', 
                border: '1px solid var(--border-light)',
                color: 'var(--text-main)',
                fontSize: '12px',
                fontWeight: '800',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ color: 'var(--glow-orange)' }}
            />
            <Line
              type="monotone" 
              dataKey="balance" 
              stroke="var(--glow-orange)" 
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MarketPositionChart;
