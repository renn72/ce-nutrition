import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/server/api/routers/index.ts'],
	outDir: 'src/server/api/root',
	dts: true,
	format: 'esm', // <-- Dont forget this
})
