import { GraphClient } from '@optimizely/cms-sdk';
import { getGraphGatewayUrl } from './config';

export function getGraphClient() {
  return new GraphClient(process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!, {
    graphUrl: getGraphGatewayUrl(),
  });
}
