import { cache } from 'react';
import type { Metadata } from 'next';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { notFound } from 'next/navigation';
import { getGraphClient } from '@/lib/graphClient';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

const getContent = cache(async (slug: string[]) => {
  const client = getGraphClient();
  const content = await client.getContentByPath(`/${slug.join('/')}/`);
  return content?.[0] ?? null;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent(slug);
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

export async function Page({ params }: Props) {
  const { slug } = await params;
  const content = await getContent(slug);

  if (!content) {
    notFound();
  }

  return <OptimizelyComponent content={content} />;
}

export default withAppContext(Page);
