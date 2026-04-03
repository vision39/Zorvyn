import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, 
  faMoon, 
  faCreditCard,
  faBullseye,
  faArrowTrendUp,
  faBolt,
  faChartLine,
  faAward
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import TransactionsList from './components/TransactionsList';
import TransactionModal from './components/TransactionModal';
import { MOCK_TRANSACTIONS, getChartData, getCategoryData } from './data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [role, setRole] = useState('admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const [timeframe, setTimeframe] = useState(30);
  const chartData = useMemo(() => getChartData(transactions, timeframe), [transactions, timeframe]);
  const categoryData = useMemo(() => getCategoryData(transactions), [transactions]);

  const handleSaveTransaction = (transactionData) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t => t.id === transactionData.id ? transactionData : t));
    } else {
      setTransactions([transactionData, ...transactions]);
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="flex min-h-screen antialiased relative">
      {/* Glow blobs to simulate ambient lighting in dark mode */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--glow-green)] opacity-5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--glow-orange)] opacity-5 blur-[120px] pointer-events-none" />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col z-10">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 flex items-center justify-between p-6 md:p-8 backdrop-blur-xl bg-[var(--app-bg)]/60 border-b border-[var(--border-light)]">
          <div>
            <h1 className="text-2xl font-black tracking-tight uppercase">
              {activeTab === 'dashboard' ? 'Financial Core' : activeTab}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 mt-1">Institutional Oversight</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 glass-pill p-1.5 rounded-full shadow-sm">
              <button 
                className="p-2.5 rounded-full hover:bg-[var(--border-light)] transition-all duration-300" 
                onClick={toggleTheme}
              >
                {theme === 'light' ? <FontAwesomeIcon icon={faMoon} className="text-[var(--text-muted)] text-sm" /> : <FontAwesomeIcon icon={faSun} className="text-[var(--glow-orange)] text-sm" />}
              </button>
              
              <div className="h-6 w-[1px] bg-[var(--border-light)]" />
              
              <div className="flex items-center gap-4 px-3 py-1.5 focus-within:ring-0">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold tracking-tight text-[var(--text-main)]">Deepak Raj</span>
                  <span className="text-[10px] font-semibold text-[var(--brand-accent)] tracking-wider">
                    {role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                </div>
                
                <button 
                  onClick={() => setRole(role === 'admin' ? 'user' : 'admin')}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center shadow-inner ${
                    role === 'admin' ? 'bg-[var(--brand-accent)]' : 'bg-[var(--border-light)]'
                  }`}
                >
                  <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 40 }}
                    className="w-4 h-4 mx-1 bg-white rounded-full shadow-sm"
                    animate={{ x: role === 'admin' ? 24 : 0 }}
                  />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 md:p-8 flex-1 overflow-x-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.15,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              {activeTab === 'dashboard' && (
                <DashboardView 
                  transactions={transactions} 
                  chartData={chartData} 
                  categoryData={categoryData} 
                  timeframe={timeframe}
                  setTimeframe={setTimeframe}
                />
              )}

              {activeTab === 'transactions' && (
                <TransactionsList 
                  transactions={transactions} 
                  role={role} 
                  onAdd={() => {
                    setEditingTransaction(null);
                    setIsModalOpen(true);
                  }}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                />
              )}

              {activeTab === 'insights' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="lg:col-span-2 space-y-6">
                       <div className="p-8 rounded-[2rem] glass-panel relative overflow-hidden">
                         <div className="mb-10 relative z-10">
                           <h3 className="text-2xl font-black tracking-tight text-[var(--text-main)] mb-1">Financial Intelligence</h3>
                           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Algorithmic analysis of your capital footprint</p>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                            {[
                              { 
                                icon: <FontAwesomeIcon icon={faBolt} className="text-[var(--brand-accent)]" />, 
                                title: "Spending Burn Rate", 
                                desc: "Your daily average burn is ₹4,200. This is 12% lower than the regional average.",
                                color: "var(--brand-accent)"
                              },
                              { 
                                icon: <FontAwesomeIcon icon={faAward} className="text-[var(--glow-green)]" />, 
                                title: "Wealth Velocity", 
                                desc: "Based on current savings, you are on track to hit your first ₹1Cr by July 2028.",
                                color: "var(--glow-green)"
                              }
                            ].map((insight, idx) => (
                              <div key={idx} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                <div className="mb-5">{insight.icon}</div>
                                <h4 className="font-bold text-[var(--text-main)] mb-2">{insight.title}</h4>
                                <p className="text-xs font-medium text-[var(--text-muted)] leading-relaxed">{insight.desc}</p>
                              </div>
                            ))}
                         </div>

                         {/* Subtle background glow */}
                         <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-accent)] opacity-5 blur-[100px] rounded-full pointer-events-none" />
                       </div>

                       <div className="p-8 rounded-[2rem] glass-panel">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-6">Capital Allocation Strategy</h4>
                          <div className="space-y-4">
                            {[
                              { label: 'Food & Dining', value: 85, color: 'var(--glow-orange)' },
                              { label: 'Transportation', value: 45, color: '#3b82f6' },
                              { label: 'Investment', value: 72, color: 'var(--glow-green)' }
                            ].map((item, i) => (
                              <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                                  <span className="text-[var(--text-main)]">{item.label}</span>
                                  <span className="text-[var(--text-muted)]">{item.value}% Utilization</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.value}%` }}
                                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                    style={{ backgroundColor: item.color }}
                                    className="h-full rounded-full shadow-[0_0_8px] shadow-current opacity-80"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>
                    
                    <div className="p-8 rounded-[2rem] glass-panel relative overflow-hidden h-fit border-[var(--glow-orange)]/20">
                       <div className="relative z-10 flex flex-col gap-8">
                         <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--brand-accent)] to-[#f97316] flex items-center justify-center text-white shadow-xl shadow-[var(--brand-accent)]/20">
                            <FontAwesomeIcon icon={faChartLine} className="text-xl" />
                         </div>
                         <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Projected Net Worth</p>
                           <h3 className="text-4xl font-black mt-2 text-[var(--text-main)] tracking-tight">₹48.2L</h3>
                           <p className="text-[var(--text-muted)] text-[11px] mt-2 font-bold uppercase tracking-wide">Q4 2026 Forecast</p>
                         </div>
                         <div className="pt-4 space-y-3">
                            <button className="w-full py-4 bg-[var(--text-main)] text-[var(--panel-bg)] rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95">
                               Optimize Portfolio
                            </button>
                            <p className="text-[9px] text-center font-bold text-[var(--text-muted)] uppercase tracking-tight">AI-Generated Projection Module</p>
                         </div>
                       </div>
                       
                       <div className="absolute bottom-[-20%] right-[-20%] w-64 h-64 bg-[var(--brand-accent)] opacity-10 blur-[100px] rounded-full pointer-events-none" />
                    </div>
                </div>
              )}

              {!['dashboard', 'transactions', 'insights'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in slide-in-from-bottom-5">
                   <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300 mb-6 border border-dashed border-slate-300 dark:border-slate-800">
                     <FontAwesomeIcon icon={faCreditCard} className="text-4xl" />
                   </div>
                   <h3 className="text-2xl font-black tracking-tight">{activeTab} View Locked</h3>
                   <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-2">The alpha core for this module is under deployment. Check back in the next version update.</p>
                   <button 
                     className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none"
                     onClick={() => setActiveTab('dashboard')}
                   >
                     Safe Return to Command
                   </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <TransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveTransaction}
          editingTransaction={editingTransaction}
        />
      </div>
    </div>
  );
}

export default App;
