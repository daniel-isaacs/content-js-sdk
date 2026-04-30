import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { notFound } from 'next/navigation';
import { getGraphClient } from '@/lib/graphClient';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

async function getContent(slug: string[]) {
  const client = getGraphClient();
  const content = await client.getContentByPath(`/${slug.join('/')}/`);
  return content?.[0] ?? null;
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
