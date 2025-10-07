import { registerOTel, OTLPHttpJsonTraceExporter } from '@vercel/otel'

export function register() {
	registerOTel({ serviceName: 'ce-nutrition',
traceExporter: new OTLPHttpJsonTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    }),
  })
}
// NOTE: You can replace `your-project-name` with the actual name of your project
