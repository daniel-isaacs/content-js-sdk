export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { BatchSpanProcessor } = await import('@opentelemetry/sdk-trace-node');
    const { PeriodicExportingMetricReader } = await import('@opentelemetry/sdk-metrics');
    const { appendFileSync } = await import('fs');
    const { join } = await import('path');

    const logFile = join(process.cwd(), 'otel-output.log');

    const createFileExporter = (label: string) => ({
      export(data: any, resultCallback: (result: { code: number }) => void): void {
        appendFileSync(logFile, `\n--- ${label} ---\n${JSON.stringify(data)}\n`);
        resultCallback({ code: 0 });
      },
      forceFlush: () => Promise.resolve(),
      shutdown: () => Promise.resolve(),
    });

    const sdk = new NodeSDK({
      spanProcessor: new BatchSpanProcessor(createFileExporter('SPANS') as any),
      metricReader: new PeriodicExportingMetricReader({
        exporter: createFileExporter('METRICS') as any,
      }),
    });

    sdk.start();
  }
}
