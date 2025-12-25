import Link from 'next/link';
import { ArrowLeftIcon, CloudArrowUpIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { AgentConfigurator } from '@/components/AgentConfigurator';
import { CallAnalytics } from '@/components/CallAnalytics';
import { TranscriptPreview } from '@/components/TranscriptPreview';

const playbooks = [
  {
    name: 'Renewal save call',
    description: 'Keep customers engaged and secure renewals with automated incentives.',
    status: 'Ready'
  },
  {
    name: 'NPS follow-up',
    description: 'Trigger human supervisor call if sentiment drops below -0.4.',
    status: 'Draft'
  },
  {
    name: 'Deposit recovery',
    description: 'Proactively reach out to unpaid estimates with smart scheduling.',
    status: 'Live'
  }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-16">
      <div className="border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900">
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <button className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 font-medium text-neutral-700 transition hover:border-primary-400 hover:text-primary-600">
              <CloudArrowUpIcon className="h-4 w-4" />
              Sync CRM
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 font-medium text-white transition hover:bg-primary-700">
              <PhoneIcon className="h-4 w-4" />
              Launch campaign
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pt-10">
        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            CallPilot Ops Center
          </span>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-neutral-900">Skyline Roofing voice automation</h1>
              <p className="mt-1 max-w-2xl text-sm text-neutral-600">
                Configure your AI caller, orchestrate compliant call flows, and simulate production before you go live.
              </p>
            </div>
            <div className="flex gap-3 text-xs text-neutral-500">
              <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-2">
                <p className="font-semibold text-neutral-700">Agents online</p>
                <p className="text-lg font-semibold text-primary-600">12</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-2">
                <p className="font-semibold text-neutral-700">Calls today</p>
                <p className="text-lg font-semibold text-primary-600">248</p>
              </div>
            </div>
          </div>
        </header>

        <AgentConfigurator />

        <section className="grid gap-6 lg:grid-cols-[0.6fr_0.4fr]">
          <CallAnalytics />
          <TranscriptPreview />
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Operational playbooks</h2>
              <p className="text-sm text-neutral-500">Keep humans in the loop with scenario-specific runbooks.</p>
            </div>
            <button className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary-400 hover:text-primary-600">
              New playbook
            </button>
          </div>
          <div className="mt-6 space-y-3">
            {playbooks.map((playbook) => (
              <article key={playbook.name} className="flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{playbook.name}</h3>
                  <p className="text-sm text-neutral-600">{playbook.description}</p>
                </div>
                <span
                  className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${
                    playbook.status === 'Live'
                      ? 'bg-emerald-100 text-emerald-700'
                      : playbook.status === 'Ready'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {playbook.status}
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
