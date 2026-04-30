import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { notFound } from 'next/navigation';
import { getGraphClient } from '@/lib/graphClient';

async function RootPage() {
  const client = getGraphClient();
  const content = await client.getContentByPath('/');
  const page = content?.[0] ?? null;

  if (!page) {
    notFound();
  }

  return <OptimizelyComponent content={page} />;
}

export default withAppContext(RootPage);
