export type DistortionType =
  | 'all_or_nothing'
  | 'overgeneralization'
  | 'mental_filter'
  | 'disqualifying_positive'
  | 'mind_reading'
  | 'fortune_telling'
  | 'magnification_minimization'
  | 'emotional_reasoning'
  | 'should_statements'
  | 'labeling';

export interface IdentifiedDistortion {
  type: DistortionType;
  originalText: string;
  analysis: string;
}

export interface AnalysisResult {
  distortions: IdentifiedDistortion[];
  summary: string;
  encouragement: string;
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  distortions: Record<DistortionType, number>;
}

export interface WeeklyData {
  records: DailyRecord[];
}
