import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ChatInput from '../components/ChatInput';
import LoadingOverlay from '../components/LoadingOverlay';
import PageTransition from '../components/PageTransition';
import { useAnalysis } from '../store/useAnalysis';
import { analyzeCBT } from '../services/claude';
import { recordAnalysis } from '../store/trackingStore';

export default function InputPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useAnalysis();

  const handleSubmit = async (text: string) => {
    dispatch({ type: 'SET_USER_TEXT', payload: text });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const result = await analyzeCBT(text);
      dispatch({ type: 'SET_RESULT', payload: result });
      recordAnalysis(result);
      navigate('/result');
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err instanceof Error ? err.message : '分析失败，请重试',
      });
    }
  };

  return (
    <PageTransition>
      <div className="input-page">
        <div className="input-page-bg" />

        <div className="input-content">
          <div className="koala-section">
            <img
              src="/koala.png"
              alt="映心考拉"
              className="koala-img"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h1 className="app-title">映心</h1>
            <p className="app-subtitle">
              说出你的心事，让我帮你看见思维中的小陷阱
            </p>
          </div>

          <ChatInput onSubmit={handleSubmit} disabled={state.loading} />

          <div className="input-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/tracking')}
              disabled={state.loading}
            >
              查看本周数据
            </button>
          </div>

          {state.error && (
            <p className="error-msg">{state.error}</p>
          )}
        </div>

        <AnimatePresence>
          {state.loading && <LoadingOverlay />}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
