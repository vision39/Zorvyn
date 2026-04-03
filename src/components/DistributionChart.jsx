import { motion } from 'framer-motion';
import { 
  PieChart,
  Pie,
  Sector,
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const DistributionChart = ({ categoryData, colors, formatCurrency }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 glass-panel rounded-3xl h-[450px]"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-[var(--text-main)]">Distribution</h3>
      </div>
      <div className="h-[300px] flex items-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              stroke="var(--panel-bg)"
              strokeWidth={3}
              cornerRadius={8}
              shape={(props) => (
                <Sector 
                  {...props} 
                  fill={colors[props.index % colors.length]} 
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                />
              )}
            />
            <Tooltip 
               formatter={(val) => formatCurrency(val)}
               contentStyle={{ 
                 backgroundColor: 'var(--panel-bg)', 
                 color: 'var(--text-main)', 
                 fontSize: '13px', 
                 border: '1px solid var(--border-light)', 
                 borderRadius: '16px', 
                 fontWeight: 'bold' 
               }}
               itemStyle={{ color: 'var(--text-main)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DistributionChart;
