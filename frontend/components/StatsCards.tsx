'use client';

type Stats = {
  total: number;
  lateRate: number;
  onTimeRate: number;
  averageConfidence: number;
};

type Props = {
  stats: Stats;
};

const cardItems = [
  { label: 'Total predictions', key: 'total' },
  { label: 'Late delivery rate', key: 'lateRate' },
  { label: 'On-time rate', key: 'onTimeRate' },
  { label: 'Average confidence', key: 'averageConfidence' },
] as const;

export default function StatsCards({ stats }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cardItems.map((item) => {
        const value = stats[item.key];
        const label = item.label;
        const displayValue =
          item.key === 'averageConfidence'
            ? `${value.toFixed(2)}%`
            : item.key === 'total'
            ? value.toString()
            : `${value}%`;
        return (
          <div key={item.key} className="rounded-3xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-soft">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{displayValue}</p>
          </div>
        );
      })}
    </div>
  );
}
