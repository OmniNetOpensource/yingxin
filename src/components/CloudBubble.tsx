import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IdentifiedDistortion } from '../types';
import { DISTORTIONS } from '../constants/distortions';

interface CloudBubbleProps {
  distortion: IdentifiedDistortion;
  index: number;
  x: number;
  y: number;
  scale: number;
}

export default function CloudBubble({ distortion, index, x, y, scale }: CloudBubbleProps) {
  const [expanded, setExpanded] = useState(false);
  const info = DISTORTIONS[distortion.type];

  const toggle = () => setExpanded(!expanded);

  return (
    <motion.div
      className="cloud-bubble"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `scale(${scale})`,
      }}
      initial={{ opacity: 0, y: 30, scale: 0.5 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: scale,
      }}
      transition={{
        delay: index * 0.3,
        duration: 0.6,
        ease: 'easeOut',
      }}
      onClick={toggle}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      layout
    >
      {/* Floating idle animation */}
      <motion.div
        className="cloud-inner"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="cloud-tag"
          style={{ backgroundColor: info.color }}
        >
          {info.emoji} {info.nameZh}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="cloud-detail"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="cloud-original">
                "{distortion.originalText}"
              </p>
              <p className="cloud-analysis">
                {distortion.analysis}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
