'use client';

import { sentimentHistory } from '@/lib/sampleData';

const summaryStats = [
  { label: 'Answered', value: '182', delta: '+27%' },
  { label: 'Conversions', value: '64', delta: '+13%' },
  { label: 'Voicemails', value: '44', delta: '-5%' }
];

export function CallAnalytics() {
  const areaPath = (() => {
    if (sentimentHistory.length === 0) return '';
    const points = sentimentHistory.map((point, index) => {
      const x = (index / (sentimentHistory.length - 1)) * 320;
      const normalized = (point.value + 1) / 2; // 0..1
      const y = 10 + (1 - normalized) * 80; // keep padding
      return `${x.toFixed(2)} ${y.toFixed(2)}`;
    });
    return ['M 0 100', `L ${points.join(' L ')}`, 'L 320 100 Z'].join(' ');
  })();

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Realtime analytics</h3>
          <p className="text-sm text-neutral-500">Monitor call outcomes and customer sentiment pulse.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">Live</span>
          Updated moments ago
        </div>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {summaryStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-neutral-900">{stat.value}</p>
            <p className={`text-xs font-medium ${stat.delta.startsWith('-') ? 'text-red-500' : 'text-emerald-600'}`}>{stat.delta} vs last week</p>
          </div>
        ))}
      </div>

      <section className="mt-8 space-y-4">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span className="font-medium text-neutral-800">Sentiment signal</span>
          <span>Rolling 90m window</span>
        </div>
        <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-neutral-900/90">
          <svg viewBox="0 0 320 100" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="sentimentGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#sentimentGradient)" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-6 pb-3 text-xs text-white/70">
            {sentimentHistory.map((point) => (
              <span key={point.timestamp}>{point.timestamp}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
