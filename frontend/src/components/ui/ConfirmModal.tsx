import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  title = "Confirm Action", 
  message, 
  onConfirm, 
  onCancel,
  confirmText = "Confirm Delete"
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with a premium blur and overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#2B2B2B]/30 backdrop-blur-sm"
            onClick={onCancel}
          />
          
          {/* Modal Card positioned in center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            className="relative bg-[#FAF9F6] border border-red-500/20 p-5 rounded-2xl shadow-luxury-deep max-w-sm w-full overflow-hidden text-center z-10"
          >
            {/* Top decorative red line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />

            {/* Warning Icon Container */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 border border-red-100 mb-3"
            >
              <AlertTriangle className="h-5 w-5" />
            </motion.div>

            {/* Title */}
            <h3 className="text-base font-bold text-[#2B2B2B] mb-1 tracking-wide">
              {title}
            </h3>

            {/* Message */}
            <p className="text-[#4A4A4A] text-xs leading-relaxed mb-4 px-2">
              {message}
            </p>

            {/* Actions */}
            <div className="flex gap-3 items-center justify-center">
              <button
                onClick={onCancel}
                className="flex-1 py-2 px-3 rounded-lg text-[#2B2B2B]/75 hover:text-[#2B2B2B] hover:bg-black/5 transition-all font-semibold tracking-wide text-xs cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                onClick={() => {
                  onConfirm();
                  onCancel();
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white transition-all font-semibold tracking-wide text-xs shadow-[0_4px_12px_rgba(220,38,38,0.15)] cursor-pointer"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;

