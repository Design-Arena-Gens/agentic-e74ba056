import Link from 'next/link';
import { CheckCircleIcon, PhoneIcon, SparklesIcon } from '@heroicons/react/24/solid';

const features = [
  {
    title: 'Adaptive conversations',
    description:
      'Scriptless calling flows that learn from every interaction, tailoring responses to your customers in real time.',
    icon: SparklesIcon
  },
  {
    title: '360° customer view',
    description:
      'Unify CRM data, purchase history, and custom knowledge bases so agents converse with full context.',
    icon: CheckCircleIcon
  },
  {
    title: 'Live coaching & insights',
    description:
      'Follow along with live transcripts, sentiment alerts, and automated post-call summaries.',
    icon: PhoneIcon
  }
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-neutral-900 py-24 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-wide text-white/80">
              <SparklesIcon className="h-4 w-4" />
              Launch in minutes
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Give your business a calling agent that never misses a beat
            </h1>
            <p className="max-w-xl text-lg text-white/80">
              CallPilot brings together AI voice, knowledge orchestration, and compliance automation so you can
              launch trustworthy calling agents faster than ever.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-3 text-base font-medium text-white transition hover:bg-primary-600"
              >
                Configure your agent
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-base font-medium text-white transition hover:border-white/40"
              >
                Explore capabilities
              </a>
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <div className="relative w-full max-w-md rounded-3xl bg-white/10 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur">
              <div className="space-y-4 text-sm text-white/70">
                <div className="flex items-center justify-between rounded-xl bg-white/10 p-3">
                  <div>
                    <p className="font-semibold text-white">Call volume</p>
                    <p className="text-xs text-white/60">Weekly goal</p>
                  </div>
                  <span className="text-2xl font-semibold text-primary-100">+32%</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-wider text-white/60">Live agents</p>
                    <p className="mt-2 text-2xl font-semibold text-white">12</p>
                    <p className="text-xs text-primary-100">+4 today</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-wider text-white/60">Active campaigns</p>
                    <p className="mt-2 text-2xl font-semibold text-white">5</p>
                    <p className="text-xs text-white/60">3 outbound • 2 inbound</p>
                  </div>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-white/60">Current call</p>
                  <p className="mt-2 text-sm text-white">
                    “Thanks for calling, Michelle! Based on your contract renewal we can get you upgraded today.”
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4 text-neutral-900">
                <div>
                  <p className="font-semibold">Live sentiment</p>
                  <p className="text-xs text-neutral-500">Customer is positive</p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">+0.82</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-semibold text-neutral-900 sm:text-4xl">Everything your voice team needs</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-neutral-600">
            Build smart voice experiences, enforce compliance, and keep humans in the loop with a unified operating
            system for calling agents.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <feature.icon className="h-8 w-8 text-primary-600" />
                <h3 className="mt-6 text-xl font-semibold text-neutral-900">{feature.title}</h3>
                <p className="mt-3 text-base text-neutral-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-600 py-20 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Launch a pilot in under an hour</h2>
          <p className="max-w-2xl text-lg text-white/80">
            Import target segments, draft your voice persona, and plug in business logic with our no-code flow builder.
            When you are ready, scale to production with just a toggle.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 transition hover:bg-primary-100"
          >
            Start building your call flow
          </Link>
        </div>
      </section>

      <footer className="bg-neutral-900 py-12 text-sm text-neutral-200">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} CallPilot Labs. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-white">
              Console
            </Link>
            <a href="mailto:sales@callpilot.ai" className="hover:text-white">
              Contact sales
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
