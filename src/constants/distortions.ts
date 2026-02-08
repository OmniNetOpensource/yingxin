import type { DistortionType } from '../types';

export interface DistortionInfo {
  type: DistortionType;
  nameZh: string;
  nameEn: string;
  description: string;
  color: string;
  emoji: string;
}

export const DISTORTIONS: Record<DistortionType, DistortionInfo> = {
  all_or_nothing: {
    type: 'all_or_nothing',
    nameZh: '全或无思维',
    nameEn: 'All-or-Nothing Thinking',
    description: '用非黑即白的方式看待事物，没有中间地带',
    color: '#E57373',
    emoji: '⚫',
  },
  overgeneralization: {
    type: 'overgeneralization',
    nameZh: '过度概括',
    nameEn: 'Overgeneralization',
    description: '从单一事件得出普遍性的消极结论',
    color: '#FFB74D',
    emoji: '🔄',
  },
  mental_filter: {
    type: 'mental_filter',
    nameZh: '心理过滤',
    nameEn: 'Mental Filter',
    description: '只关注消极细节，忽略整体画面',
    color: '#BA68C8',
    emoji: '🔍',
  },
  disqualifying_positive: {
    type: 'disqualifying_positive',
    nameZh: '否定正面',
    nameEn: 'Disqualifying the Positive',
    description: '将正面经历转化为负面，认为好事"不算数"',
    color: '#4FC3F7',
    emoji: '❌',
  },
  mind_reading: {
    type: 'mind_reading',
    nameZh: '读心术',
    nameEn: 'Mind Reading',
    description: '未经验证就断定别人在想什么',
    color: '#81C784',
    emoji: '🧠',
  },
  fortune_telling: {
    type: 'fortune_telling',
    nameZh: '预言家错误',
    nameEn: 'Fortune Telling',
    description: '预测事情一定会变糟，仿佛这是既定事实',
    color: '#FFD54F',
    emoji: '🔮',
  },
  magnification_minimization: {
    type: 'magnification_minimization',
    nameZh: '放大/缩小',
    nameEn: 'Magnification/Minimization',
    description: '夸大负面事物的重要性，缩小正面事物的意义',
    color: '#F06292',
    emoji: '🔭',
  },
  emotional_reasoning: {
    type: 'emotional_reasoning',
    nameZh: '情绪化推理',
    nameEn: 'Emotional Reasoning',
    description: '把感受当作事实的证据："我觉得是这样，所以一定是这样"',
    color: '#9575CD',
    emoji: '💭',
  },
  should_statements: {
    type: 'should_statements',
    nameZh: '应该陈述',
    nameEn: 'Should Statements',
    description: '用"应该""必须"来要求自己或他人',
    color: '#4DB6AC',
    emoji: '📏',
  },
  labeling: {
    type: 'labeling',
    nameZh: '贴标签',
    nameEn: 'Labeling',
    description: '给自己或他人贴上固定的负面标签',
    color: '#A1887F',
    emoji: '🏷️',
  },
};