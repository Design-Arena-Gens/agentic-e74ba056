'use client';

import { transcriptSample } from '@/lib/sampleData';

export function TranscriptPreview() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-neutral-900">Live transcript</h3>
      <p className="mt-1 text-sm text-neutral-500">Follow along in real time and leave in-line coaching notes.</p>
      <div className="mt-6 space-y-4 text-sm">
        {transcriptSample.map((line, index) => (
          <div key={index} className="flex gap-3">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${line.speaker === 'Agent' ? 'bg-primary-100 text-primary-700' : 'bg-neutral-100 text-neutral-600'}`}>
              {line.speaker.slice(0, 2)}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{line.speaker}</p>
              <p className="mt-1 text-neutral-700">{line.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full rounded-full border border-neutral-200 bg-neutral-50 py-2 text-sm font-semibold text-neutral-700 transition hover:border-primary-400 hover:text-primary-600">
        Open full transcript
      </button>
    </div>
  );
}
