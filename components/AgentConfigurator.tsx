'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AgentConfig, agentConfigSchema } from '@/lib/schemas';
import { sampleAgentConfig } from '@/lib/sampleData';

const channelOptions = [
  { label: 'Outbound', value: 'outbound' },
  { label: 'Inbound', value: 'inbound' },
  { label: 'Voicemail drop', value: 'voicemail' },
  { label: 'SMS follow-up', value: 'sms' }
];

interface AgentPreview {
  summary: string;
  recommendedPlaybooks: string[];
  urgencyScore: number;
  tasks: string[];
}

export function AgentConfigurator() {
  const [preview, setPreview] = useState<AgentPreview | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue
  } = useForm<AgentConfig>({
    resolver: zodResolver(agentConfigSchema),
    defaultValues: sampleAgentConfig
  });

  const faqFieldArray = useFieldArray({
    control,
    name: 'dataset.faqs'
  });
  const docs = watch('dataset.docs');

  const onSubmit = async (data: AgentConfig) => {
    try {
      setIsSaving(true);
      setError(null);

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create agent preview');
      }

      const body = (await response.json()) as AgentPreview & { savedAt: string };
      setPreview({
        summary: body.summary,
        recommendedPlaybooks: body.recommendedPlaybooks,
        urgencyScore: body.urgencyScore,
        tasks: body.tasks
      });
      setLastSaved(body.savedAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <header className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-neutral-900">Agent persona</h2>
          <p className="text-sm text-neutral-500">Craft the voice, guardrails, and escalation steps for your AI caller.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
            Persona name
            <input
              {...register('persona.name')}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="e.g., Skyline Concierge"
            />
            {errors.persona?.name && <span className="text-xs text-red-500">{errors.persona.name.message}</span>}
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
            Compliance prompt
            <input
              {...register('persona.compliance')}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Disclosures, consent, etc."
            />
            {errors.persona?.compliance && <span className="text-xs text-red-500">{errors.persona.compliance.message}</span>}
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
          Introduction script
          <textarea
            {...register('persona.greeting')}
            rows={3}
            className="rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="How should the agent open the call?"
          />
          {errors.persona?.greeting && <span className="text-xs text-red-500">{errors.persona.greeting.message}</span>}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
          Escalation plan
          <textarea
            {...register('persona.escalation')}
            rows={3}
            className="rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="When should humans step in?"
          />
          {errors.persona?.escalation && <span className="text-xs text-red-500">{errors.persona.escalation.message}</span>}
        </label>

        <section className="space-y-4">
          <header>
            <h3 className="text-lg font-semibold text-neutral-900">Call objectives</h3>
            <p className="text-sm text-neutral-500">Outline what success looks like and select communication channels.</p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
              Primary objective
              <textarea
                {...register('callFlow.objective')}
                rows={3}
                className="rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              {errors.callFlow?.objective && <span className="text-xs text-red-500">{errors.callFlow.objective.message}</span>}
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
              Success criteria
              <textarea
                {...register('callFlow.successCriteria')}
                rows={3}
                className="rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              {errors.callFlow?.successCriteria && <span className="text-xs text-red-500">{errors.callFlow.successCriteria.message}</span>}
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
            Fallback strategy
            <textarea
              {...register('callFlow.fallbackStrategy')}
              rows={2}
              className="rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            {errors.callFlow?.fallbackStrategy && <span className="text-xs text-red-500">{errors.callFlow.fallbackStrategy.message}</span>}
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-neutral-700">Channels</legend>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {channelOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm capitalize hover:border-primary-400">
                  <input
                    type="checkbox"
                    value={option.value}
                    {...register('callFlow.channels')}
                    className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors.callFlow?.channels && <span className="text-xs text-red-500">{errors.callFlow.channels.message}</span>}
          </fieldset>
        </section>

        <section className="space-y-4">
          <header>
            <h3 className="text-lg font-semibold text-neutral-900">Scheduling guardrails</h3>
            <p className="text-sm text-neutral-500">Choose when outbound calls should run and how to handle time zones.</p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
              Timezone
              <input
                {...register('schedule.timezone')}
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="America/New_York"
              />
              {errors.schedule?.timezone && <span className="text-xs text-red-500">{errors.schedule.timezone.message}</span>}
            </label>
            <div className="grid grid-cols-2 gap-4 text-sm font-medium text-neutral-700">
              <label className="flex flex-col gap-2">
                Start hour (24h)
                <input
                  type="number"
                  min={0}
                  max={23}
                  {...register('schedule.startHour', { valueAsNumber: true })}
                  className="rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
                {errors.schedule?.startHour && <span className="text-xs text-red-500">{errors.schedule.startHour.message}</span>}
              </label>
              <label className="flex flex-col gap-2">
                End hour (24h)
                <input
                  type="number"
                  min={0}
                  max={23}
                  {...register('schedule.endHour', { valueAsNumber: true })}
                  className="rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
                {errors.schedule?.endHour && <span className="text-xs text-red-500">{errors.schedule.endHour.message}</span>}
              </label>
            </div>
          </div>
          <fieldset className="space-y-2 text-sm text-neutral-700">
            <legend className="font-medium">Active weekdays</legend>
            <div className="flex flex-wrap gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <label key={day} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm">
                  <input type="checkbox" value={day} {...register('schedule.weekdays')} className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500" />
                  {day}
                </label>
              ))}
            </div>
            {errors.schedule?.weekdays && <span className="text-xs text-red-500">{errors.schedule.weekdays.message}</span>}
          </fieldset>
        </section>

        <section className="space-y-4">
          <header>
            <h3 className="text-lg font-semibold text-neutral-900">Knowledge base</h3>
            <p className="text-sm text-neutral-500">Surface documents, policies, and answers that should inform every call.</p>
          </header>

          <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex items-center justify-between text-sm font-medium text-neutral-700">
              <span>Reference links</span>
              <button
                type="button"
                onClick={() => setValue('dataset.docs', [...(docs ?? []), ''])}
                className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-primary-600"
              >
                Add link
              </button>
            </div>
            {(!docs || docs.length === 0) && (
              <p className="rounded-xl border border-dashed border-neutral-300 bg-white px-3 py-3 text-xs text-neutral-500">
                No documents attached yet. Add knowledge sources to boost recall.
              </p>
            )}
            <div className="space-y-3">
              {(docs ?? []).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    {...register(`dataset.docs.${index}` as const)}
                    placeholder="https://example.com/handbook.pdf"
                    className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...(docs ?? [])];
                      next.splice(index, 1);
                      setValue('dataset.docs', next);
                    }}
                    className="text-xs font-medium text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex items-center justify-between text-sm font-medium text-neutral-700">
              <span>FAQ snippets</span>
              <button
                type="button"
                onClick={() => faqFieldArray.append({ question: '', answer: '' })}
                className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-primary-600"
              >
                Add FAQ
              </button>
            </div>
            <div className="space-y-4">
              {faqFieldArray.fields.map((field, index) => (
                <div key={field.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <label className="flex flex-col gap-2 text-xs font-medium text-neutral-600">
                    Question
                    <input
                      {...register(`dataset.faqs.${index}.question` as const)}
                      className="rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      placeholder="How do I..."
                    />
                    {errors.dataset?.faqs?.[index]?.question && (
                      <span className="text-xs text-red-500">{errors.dataset.faqs[index]?.question?.message}</span>
                    )}
                  </label>
                  <label className="mt-3 flex flex-col gap-2 text-xs font-medium text-neutral-600">
                    Answer
                    <textarea
                      {...register(`dataset.faqs.${index}.answer` as const)}
                      rows={3}
                      className="rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                    {errors.dataset?.faqs?.[index]?.answer && (
                      <span className="text-xs text-red-500">{errors.dataset.faqs[index]?.answer?.message}</span>
                    )}
                  </label>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => faqFieldArray.remove(index)}
                      className="text-xs font-medium text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-4">
          <div className="text-xs text-neutral-500">
            {lastSaved ? `Last generated ${lastSaved}` : 'No preview yet'}
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? 'Generating preview…' : 'Generate deployment plan'}
          </button>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">Agent preview</h3>
          <p className="mt-1 text-sm text-neutral-500">We simulate the first few calls to stress-test your configuration.</p>

          {preview ? (
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl bg-primary-50 p-4 text-sm text-primary-700">
                <p className="font-medium text-primary-600">Executive summary</p>
                <p className="mt-2 leading-relaxed text-primary-700">{preview.summary}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-neutral-700">Recommended playbooks</p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                  {preview.recommendedPlaybooks.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4 text-sm">
                <p className="font-medium text-neutral-800">Automation coverage</p>
                <p className="mt-2 text-neutral-600">Urgency score <span className="font-semibold text-neutral-900">{preview.urgencyScore}</span></p>
                <div className="mt-3 space-y-2">
                  {preview.tasks.map((task) => (
                    <div key={task} className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                      <span className="text-neutral-600">{task}</span>
                      <span className="text-xs font-semibold text-primary-600">Ready</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-500">
              Configure your persona and click “Generate deployment plan” to preview the agent runbook.
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">Go-live checklist</h3>
          <ul className="mt-3 space-y-2 text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              Connect CRM and ticketing via webhook handoff.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              Upload regulatory disclosures for each locale.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              Pilot with 25 calls before unlocking auto-scale.
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
