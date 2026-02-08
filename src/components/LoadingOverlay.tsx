import { motion } from 'framer-motion';

export default function LoadingOverlay() {
  return (
    <motion.div
      className="loading-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-koala"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          🐨
        </motion.div>
        <motion.p
          className="loading-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          映心正在倾听你的心声...
        </motion.p>
      </div>
    </motion.div>
  );
}
