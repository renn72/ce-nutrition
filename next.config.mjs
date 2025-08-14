import withSerwistInit from '@serwist/next'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js')

const withSerwist = withSerwistInit({
	// Note: This is only an example. If you use Pages Router,
	// use something else that works, such as "service-worker/index.ts".
	swSrc: 'src/app/sw.ts',
	swDest: 'public/sw.js',
})

export default withSerwist({
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	typescript: {
		// Warning: This allows production builds to successfully complete even if
		// your project has TypeScript errors.
		ignoreBuildErrors: true,
	},
	images: {
		domains: ['utfs.io'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				pathname: '/',
				search: '',
			},
		],
	},
})
