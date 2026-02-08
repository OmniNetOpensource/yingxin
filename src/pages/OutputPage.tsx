import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CloudField from '../components/CloudField';
import PageTransition from '../components/PageTransition';
import { useAnalysis } from '../store/useAnalysis';

export default function OutputPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useAnalysis();

  if (!state.result) {
    navigate('/');
    return null;
  }

  const { distortions, summary, encouragement } = state.result;

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <PageTransition>
      <div className="output-page">
        <div className="output-header">
          <motion.h2
            className="output-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            你的思维云图
          </motion.h2>
          <motion.p
            className="output-summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {summary}
          </motion.p>
        </div>

        {distortions.length > 0 ? (
          <CloudField distortions={distortions} />
        ) : (
          <motion.div
            className="no-distortions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>没有发现明显的认知扭曲，你的思维很健康！</p>
          </motion.div>
        )}

        <motion.p
          className="output-encouragement"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: distortions.length * 0.3 + 0.8 }}
        >
          {encouragement}
        </motion.p>

        <motion.div
          className="output-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: distortions.length * 0.3 + 1.2 }}
        >
          <button className="btn btn-secondary" onClick={handleReset}>
            重新倾诉
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/tracking')}>
            查看本周数据
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
