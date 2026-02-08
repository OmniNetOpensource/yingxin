import type { DailyRecord, DistortionType, AnalysisResult } from '../types';

const STORAGE_KEY = 'yingxin_tracking';

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function getWeekDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

function loadRecords(): DailyRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecords(records: DailyRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function recordAnalysis(result: AnalysisResult) {
  const records = loadRecords();
  const today = getTodayStr();
  let todayRecord = records.find((r) => r.date === today);

  if (!todayRecord) {
    todayRecord = {
      date: today,
      distortions: {} as Record<DistortionType, number>,
    };
    records.push(todayRecord);
  }

  for (const d of result.distortions) {
    todayRecord.distortions[d.type] =
      (todayRecord.distortions[d.type] || 0) + 1;
  }

  saveRecords(records);
}

export function getWeeklyData(): { date: string; label: string; [key: string]: string | number }[] {
  const records = loadRecords();
  const weekDates = getWeekDates();
  const dayLabels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  return weekDates.map((date) => {
    const record = records.find((r) => r.date === date);
    const d = new Date(date + 'T00:00:00');
    const entry: { date: string; label: string; [key: string]: string | number } = {
      date,
      label: dayLabels[d.getDay()],
    };
    if (record) {
      for (const [key, val] of Object.entries(record.distortions)) {
        entry[key] = val;
      }
    }
    return entry;
  });
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEY);
}
