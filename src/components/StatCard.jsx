import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon, change, active, formatCurrency }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden group p-6 rounded-3xl transition-all duration-500 glass-panel ${
        active ? 'border-[var(--glow-orange)]/40 shadow-[inset_0_0_20px_rgba(249,115,22,0.05)]' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-6 relative z-10">
         <div className={`p-2.5 rounded-xl ${active ? 'bg-[var(--glow-orange)]/10 text-[var(--glow-orange)]' : 'bg-[var(--border-light)] text-[var(--text-muted)]'}`}>
           {icon}
         </div>
         <div className={`text-xs font-bold ${active ? 'text-[var(--glow-orange)]' : 'text-[var(--text-muted)]'}`}>
           {change}
         </div>
      </div>
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-xs font-semibold text-[var(--text-muted)]">
          {label}
        </span>
        <span className="text-3xl font-black tabular-nums tracking-tight text-[var(--text-main)]">
          {formatCurrency(value)}
        </span>
      </div>
      {active && (
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--glow-orange)] opacity-10 blur-3xl rounded-full pointer-events-none group-hover:opacity-20 transition-opacity" />
      )}
    </motion.div>
  );
};

export default StatCard;
