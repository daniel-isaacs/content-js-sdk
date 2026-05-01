import { cache } from 'react';
import type { Metadata } from 'next';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { notFound } from 'next/navigation';
import { getGraphClient } from '@/lib/graphClient';

const getRootContent = cache(async () => {
  const client = getGraphClient();
  const content = await client.getContentByPath('/');
  return content?.[0] ?? null;
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getRootContent();
  if (!content) return {};

  const c = content as Record<string, unknown>;
  const title =
    (typeof c.metaTitle === 'string' && c.metaTitle) ||
    (typeof c.heading === 'string' && c.heading) ||
    undefined;
  const description =
    (typeof c.metaDescription === 'string' && c.metaDescription) || undefined;

  return { title, description };
}

async function RootPage() {
  const page = await getRootContent();

  if (!page) {
    notFound();
  }

  return <OptimizelyComponent content={page} />;
}

export default withAppContext(RootPage);
