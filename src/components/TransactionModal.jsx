import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faXmark, 
  faCalendarDays, 
  faCircleInfo, 
  faTag 
} from '@fortawesome/free-solid-svg-icons';

const TransactionModal = ({ isOpen, onClose, onSave, editingTransaction }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'Food & Dining',
    type: 'expense',
    amount: ''
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: 'Food & Dining',
        type: 'expense',
        amount: ''
      });
    }
  }, [editingTransaction, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: Number(formData.amount),
      id: editingTransaction?.id || `tx-${Date.now()}`
    });
    onClose();
  };

  const categories = [
    'Food & Dining', 'Transportation', 'Rent & Housing', 
    'Entertainment', 'Shopping', 'Salary', 'Investment', 'Healthcare'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-panel rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
                  {editingTransaction ? 'Modify Record' : 'Log Entry'}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-widest font-black">
                  Institutional Oversight Core
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[var(--text-muted)] transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDays} className="text-[10px]" /> Date
                  </label>
                  <input 
                    type="date" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm font-bold text-[var(--text-main)] outline-none focus:border-[var(--brand-accent)]/50 transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleInfo} className="text-[10px]" /> Type
                  </label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm font-bold text-[var(--text-main)] outline-none focus:border-[var(--brand-accent)]/50 transition-all appearance-none"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="income" className="bg-[var(--panel-bg)]">Income</option>
                    <option value="expense" className="bg-[var(--panel-bg)]">Expense</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                  <FontAwesomeIcon icon={faTag} className="text-[10px]" /> Category
                </label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm font-bold text-[var(--text-main)] outline-none focus:border-[var(--brand-accent)]/50 transition-all appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map(c => <option key={c} value={c} className="bg-[var(--panel-bg)]">{c}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleInfo} className="text-[10px]" /> Description
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Monthly Subscription"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm font-bold text-[var(--text-main)] outline-none focus:border-[var(--brand-accent)]/50 transition-all placeholder:text-white/20"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                   Volume (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[var(--text-muted)]">₹</span>
                  <input 
                    type="number" 
                    required
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-4 text-2xl font-black text-[var(--text-main)] outline-none focus:border-[var(--brand-accent)]/50 transition-all placeholder:text-white/20"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/5 transition-all"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-gradient-to-r from-[var(--brand-accent)] to-[#f97316] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[var(--brand-accent)]/20 hover:shadow-[var(--brand-accent)]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  Authorize System Write
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;
