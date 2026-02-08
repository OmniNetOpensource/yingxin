import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WeeklyChart from '../components/WeeklyChart';
import PageTransition from '../components/PageTransition';
import { DISTORTIONS } from '../constants/distortions';
import { getWeeklyData, clearAllData } from '../store/trackingStore';
import type { DistortionType } from '../types';

const ALL_TYPES = Object.keys(DISTORTIONS) as DistortionType[];

export default function TrackingPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(getWeeklyData());
  const [showConfirm, setShowConfirm] = useState(false);

  const insightText = useMemo(() => {
    const totals = ALL_TYPES.map((type) => {
      const total = data.reduce((sum, item) => {
        const count = item[type];
        return sum + (typeof count === 'number' ? count : 0);
      }, 0);

      return { type, total };
    }).sort((a, b) => b.total - a.total);

    const top = totals[0];

    if (!top || top.total === 0) {
      return '你本周还没有记录，先去倾诉一次，我会在这里帮你追踪变化。';
    }

    return `这周最常出现的是「${DISTORTIONS[top.type].nameZh}」。提醒自己：想法会来会去，不等于真实的你。`;
  }, [data]);

  const handleClear = () => {
    clearAllData();
    setData(getWeeklyData());
    setShowConfirm(false);
  };

  return (
    <PageTransition>
      <div className="tracking-page">
        <motion.div
          className="tracking-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="tracking-header">
            <div>
              <h2 className="tracking-title">心迹雷达</h2>
              <p className="tracking-subtitle">你过去 7 天的认知模式变化</p>
            </div>
            <button
              className="tracking-close"
              onClick={() => navigate('/')}
              aria-label="关闭"
            >
              ×
            </button>
          </div>

          <div className="tracking-chart-panel">
            <WeeklyChart data={data} />
          </div>

          <div className="tracking-insight">
            <p>{insightText}</p>
          </div>

          <div className="tracking-actions">
            {!showConfirm ? (
              <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>
                清空本周数据
              </button>
            ) : (
              <div className="confirm-group">
                <span>确定清空所有追踪记录吗？</span>
                <button className="btn btn-danger" onClick={handleClear}>
                  确定
                </button>
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  取消
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
