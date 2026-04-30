// import type { Metadata } from 'next';
import { GraphClient } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { notFound } from 'next/navigation';
import { getGraphGatewayUrl } from '@/lib/config';
// import { getSeoMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

function getClient() {
  return new GraphClient(process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!, {
    graphUrl: getGraphGatewayUrl(),
  });
}

async function getContent(slug: string[]) {
  const client = getClient();
  console.log(`Getting content for path: /${slug.join('/')}/`);
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
