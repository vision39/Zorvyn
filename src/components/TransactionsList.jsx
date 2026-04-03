import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMagnifyingGlass, 
  faPlus, 
  faTrashCan,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const formatCurrency = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lac`;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

const TransactionsList = ({ transactions, role, onAdd, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === 'All' || t.category === categoryFilter;
      const matchType = typeFilter === 'All' || t.type === typeFilter;
      return matchSearch && matchCategory && matchType;
    });
  }, [transactions, searchTerm, categoryFilter, typeFilter]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, typeFilter]);

  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  return (
    <div className="p-8 glass-panel rounded-3xl animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-main)] mb-1">Financial Records</h2>
          <p className="text-xs font-medium text-[var(--text-muted)]">Audit and manage local records.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group min-w-[280px]">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--brand-accent)] transition-colors text-sm" />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[var(--border-light)] border border-transparent focus:border-[var(--brand-accent)]/30 outline-none text-xs font-semibold text-[var(--text-main)] transition-all placeholder:text-[var(--text-muted)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="px-4 py-3 rounded-full bg-[var(--border-light)] border-none outline-none text-xs font-bold text-[var(--text-main)] cursor-pointer hover:bg-[var(--border-light)] transition-colors appearance-none" 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c} className="bg-[var(--panel-bg)] text-[var(--text-main)]">{c}</option>)}
          </select>

          {role === 'admin' && (
            <button 
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--brand-accent)] to-[#f97316] text-white text-xs font-bold shadow-lg shadow-[var(--glow-orange)]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              onClick={() => onAdd()}
            >
              <FontAwesomeIcon icon={faPlus} className="text-sm" />
              <span>Record</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar pb-6 mt-4">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-[11px] font-semibold text-[var(--text-muted)] tracking-wider">
              <th className="pb-4 pl-6 uppercase">Timestamp</th>
              <th className="pb-4 uppercase">Description</th>
              <th className="pb-4 uppercase">Category</th>
              <th className="pb-4 uppercase">Type</th>
              <th className="pb-4 uppercase text-right">Volume</th>
              {role === 'admin' && <th className="pb-4 text-right pr-6 uppercase">Action</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode='popLayout'>
              {paginatedTransactions.map((t) => (
                <motion.tr 
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group transition-all hover:shadow-lg"
                >
                  <td className="py-5 pl-6 px-4 bg-[var(--border-light)] rounded-l-2xl border-y border-l border-transparent group-hover:border-[var(--glow-orange)]/20 transition-colors">
                    <span className="text-xs font-semibold text-[var(--text-main)] tracking-wide">{t.date}</span>
                  </td>
                  <td className="py-5 px-4 bg-[var(--border-light)] border-y border-transparent group-hover:border-[var(--glow-orange)]/20 transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold tracking-tight text-[var(--text-main)] line-clamp-1">{t.description}</span>
                      <span className="text-[9px] font-bold text-[var(--text-muted)] tracking-widest uppercase">ID: {t.id}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4 bg-[var(--border-light)] border-y border-transparent group-hover:border-[var(--glow-orange)]/20 transition-colors">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-5 px-4 bg-[var(--border-light)] border-y border-transparent group-hover:border-[var(--glow-orange)]/20 transition-colors">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                      t.type === 'income' 
                        ? 'bg-[var(--glow-green)]/10 text-[var(--glow-green)] border border-[var(--glow-green)]/20 shadow-[0_0_10px_var(--glow-green)]/10' 
                        : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`py-5 px-4 text-right bg-[var(--border-light)] border-y border-transparent group-hover:border-[var(--glow-orange)]/20 transition-colors ${role !== 'admin' ? 'rounded-r-2xl border-r' : ''}`}>
                    <span className={`text-base font-black tabular-nums tracking-tight ${
                      t.type === 'income' ? 'text-[var(--glow-green)]' : 'text-[var(--text-main)]'
                    }`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td className="py-5 pr-6 bg-[var(--border-light)] rounded-r-2xl border-y border-r border-transparent group-hover:border-[var(--glow-orange)]/20 transition-colors text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="p-2.5 rounded-xl bg-[var(--app-bg)] hover:bg-[var(--brand-accent)]/10 text-[var(--text-muted)] hover:text-[var(--brand-accent)] transition-colors"
                          onClick={() => onEdit(t)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} className="text-sm" />
                        </button>
                        <button 
                          className="p-2.5 rounded-xl bg-[var(--app-bg)] hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 transition-colors"
                          onClick={() => onDelete(t.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
             <div className="text-[var(--text-muted)] opacity-20">
               <FontAwesomeIcon icon={faMagnifyingGlass} className="text-4xl" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Zero Results Found</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between border-t border-[var(--border-light)] pt-8">
            <div className="text-xs font-bold text-[var(--text-muted)]">
              Showing page <span className="text-[var(--text-main)]">{currentPage}</span> of <span className="text-[var(--text-main)]">{totalPages}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-6 py-2.5 rounded-full glass-panel text-[11px] font-black uppercase tracking-widest text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--border-light)] transition-all active:scale-95"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-full text-xs font-black transition-all ${
                        currentPage === pageNum 
                          ? 'bg-[var(--brand-accent)] text-white shadow-lg shadow-[var(--glow-orange)]/20' 
                          : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-light)]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-6 py-2.5 rounded-full glass-panel text-[11px] font-black uppercase tracking-widest text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--border-light)] transition-all active:scale-95"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
