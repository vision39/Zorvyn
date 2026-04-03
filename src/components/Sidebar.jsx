import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTableColumns, 
  faArrowTrendUp, 
  faArrowTrendDown, 
  faCreditCard, 
  faChartPie, 
  faGear, 
  faCircleQuestion,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FontAwesomeIcon icon={faTableColumns} className="text-sm" /> },
    { id: 'transactions', label: 'Transactions', icon: <FontAwesomeIcon icon={faCreditCard} className="text-sm" /> },
    { id: 'insights', label: 'Insights', icon: <FontAwesomeIcon icon={faChartPie} className="text-sm" /> },
    { id: 'income', label: 'Income', icon: <FontAwesomeIcon icon={faArrowTrendUp} className="text-sm" /> },
    { id: 'expenses', label: 'Expenses', icon: <FontAwesomeIcon icon={faArrowTrendDown} className="text-sm" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 backdrop-blur-xl bg-[var(--app-bg)]/60 border-r border-[var(--border-light)] p-6 z-50">
      <div className="flex items-center gap-3 mb-10 group cursor-pointer pl-2">
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--glow-orange)] blur-md opacity-30 group-hover:opacity-60 transition-opacity rounded-full"></div>
          <div className="relative p-2 bg-gradient-to-tr from-[var(--brand-accent)] to-[#f97316] rounded-xl text-white shadow-lg shadow-[var(--glow-orange)]/20">
            <FontAwesomeIcon icon={faWallet} className="text-xl" />
          </div>
        </div>
        <span className="text-2xl font-black tracking-tight text-[var(--text-main)]">fin<span className="text-[var(--brand-accent)]">pulse</span></span>
      </div>
      
      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold tracking-wide transition-all duration-300 group ${
              activeTab === item.id 
                ? 'text-[var(--text-main)] bg-[var(--panel-bg)] shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-[var(--border-light)]' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--panel-bg)]'
            }`}
          >
            {activeTab === item.id && (
              <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-[var(--brand-accent)] rounded-r-lg" />
            )}
            <div className={`${activeTab === item.id ? 'text-[var(--brand-accent)]' : 'group-hover:text-[var(--brand-accent)] transition-colors'}`}>
              {item.icon}
            </div>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-[var(--border-light)] flex flex-col gap-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-light)] transition-all">
          <FontAwesomeIcon icon={faGear} className="text-sm" />
          <span>Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-light)] transition-all">
          <FontAwesomeIcon icon={faCircleQuestion} className="text-sm" />
          <span>Support</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
