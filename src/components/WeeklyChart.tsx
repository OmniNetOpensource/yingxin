import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { DISTORTIONS } from '../constants/distortions';
import type { DistortionType } from '../types';

interface WeeklyChartProps {
  data: { date: string; label: string; [key: string]: string | number }[];
}

interface DistortionSummary {
  type: DistortionType;
  name: string;
  value: number;
  color: string;
}

const ALL_TYPES: DistortionType[] = [
  'all_or_nothing',
  'overgeneralization',
  'mental_filter',
  'disqualifying_positive',
  'mind_reading',
  'fortune_telling',
  'magnification_minimization',
  'emotional_reasoning',
  'should_statements',
  'labeling',
];

function getSummaryData(
  data: { date: string; label: string; [key: string]: string | number }[]
): DistortionSummary[] {
  return ALL_TYPES.map((type) => {
    const value = data.reduce((sum, item) => {
      const current = item[type];
      return sum + (typeof current === 'number' ? current : 0);
    }, 0);

    return {
      type,
      name: DISTORTIONS[type].nameZh,
      value,
      color: DISTORTIONS[type].color,
    };
  })
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const summaryData = getSummaryData(data);

  if (summaryData.length === 0) {
    return (
      <div className="chart-empty">
        <p>📊 还没有本周数据</p>
        <p>去倾诉页聊聊天，这里就会生成你的认知模式变化</p>
      </div>
    );
  }

  return (
    <div className="weekly-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={summaryData}
          margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
        >
          <XAxis
            type="number"
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#8B7D6B' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            width={110}
            tick={{ fontSize: 14, fill: '#5D4E37', fontWeight: 600 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(232, 168, 124, 0.12)' }}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid rgba(232, 168, 124, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
            labelStyle={{ color: '#5D4E37', fontWeight: 600 }}
            formatter={(value) => [`${value} 次`, '出现频次']}
            labelFormatter={(label) => `类型：${label}`}
          />
          <Bar dataKey="value" barSize={28} radius={[0, 14, 14, 0]}>
            {summaryData.map((item) => (
              <Cell key={item.type} fill={item.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
