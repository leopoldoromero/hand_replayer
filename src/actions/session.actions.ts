'use server';
import { sessionOptions, SessionData } from '@/lib/session/session_options';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function getSessionAction() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return session;
}

export async function setSessionAction(params: Partial<SessionData>) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  Object.assign(session, params);
  await session.save();
  console.log('Session saved:', session);
}

export async function getSessionDataAction(): Promise<SessionData> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return {...session}
}