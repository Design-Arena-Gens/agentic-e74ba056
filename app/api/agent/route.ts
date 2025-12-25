import { NextResponse } from 'next/server';
import { agentConfigSchema } from '@/lib/schemas';

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = agentConfigSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Invalid configuration',
        issues: parsed.error.issues
      },
      { status: 400 }
    );
  }

  const { persona, callFlow, schedule } = parsed.data;
  const totalFaqs = parsed.data.dataset.faqs.length;
  const channelSummary = callFlow.channels.join(', ');
  const savedAt = new Date().toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' });

  const twoDigit = (value: number) => value.toString().padStart(2, '0');

  const response = {
    summary: `${persona.name} is ready to launch a ${channelSummary} program focused on ${callFlow.objective}. We detected ${totalFaqs} curated knowledge snippets and a calling window between ${twoDigit(schedule.startHour)}:${twoDigit(0)}-${twoDigit(schedule.endHour)}:${twoDigit(0)} ${schedule.timezone}.`,
    recommendedPlaybooks: [
      `Run a calibration sprint with 10 supervised calls before activating full automation.`,
      `Add a compliance checkpoint when consent is missing or the caller hesitates for more than 5 seconds.`,
      `Enable automatic CRM enrichment for every qualified lead encountered.`
    ],
    urgencyScore: Math.min(0.92, 0.65 + totalFaqs * 0.04),
    tasks: [
      'Configure telephony handoff',
      'Upload voice persona to synthesis model',
      'Connect QA reviewers',
      'Schedule pilot cohort'
    ],
    savedAt
  };

  return NextResponse.json(response);
}
