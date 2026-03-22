import path from 'node:path'
import { fileURLToPath } from 'node:url'

import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import reactPlugin from 'eslint-plugin-react'

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url))
const [, tsEslintRecommendedRules, tsEslintTypeCheckedRules] =
	tsEslintPlugin.configs['flat/recommended-type-checked']

export default [
	...nextCoreWebVitals,
	{
		ignores: [
			'.eslintrc.cjs',
			'dist/**',
			'dev-dist/**',
			'src/server/api/root/index.js',
			'src/server/api/root/index.d.ts',
		],
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: path.join(tsconfigRootDir, 'tsconfig.json'),
				tsconfigRootDir,
			},
		},
		plugins: {
			'@typescript-eslint': tsEslintPlugin,
		},
		rules: {
			...tsEslintRecommendedRules.rules,
			...tsEslintTypeCheckedRules.rules,
			'@typescript-eslint/ban-ts-comment': [
				'error',
				{ 'ts-ignore': 'allow-with-description' },
			],
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{
					prefer: 'type-imports',
					fixStyle: 'inline-type-imports',
				},
			],
			'@typescript-eslint/no-misused-promises': [
				'error',
				{ checksVoidReturn: { attributes: false } },
			],
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
	{
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		plugins: {
			react: reactPlugin,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/no-unused-vars': 'off',
			'react/prop-types': 'off',
			'no-unused-vars': 'off',
			'array-bracket-newline': ['error', { multiline: true }],
			'arrow-parens': ['warn', 'always'],
			'arrow-spacing': [
				'warn',
				{
					before: true,
					after: true,
				},
			],
			'block-spacing': ['warn', 'always'],
			'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
			camelcase: ['warn', { properties: 'never' }],
			'comma-spacing': [
				'warn',
				{
					before: false,
					after: true,
				},
			],
			'comma-style': ['warn', 'last'],
			'computed-property-spacing': ['warn', 'never'],
			curly: ['warn', 'multi-line', 'consistent'],
			'dot-location': ['warn', 'property'],
			'eol-last': ['warn', 'always'],
			'func-call-spacing': ['warn', 'never'],
			'function-call-argument-newline': ['warn', 'consistent'],
			'jsx-quotes': ['warn', 'prefer-single'],
			'key-spacing': [
				'warn',
				{
					beforeColon: false,
					afterColon: true,
				},
			],
			'keyword-spacing': [
				'warn',
				{
					before: true,
					after: true,
				},
			],
			'no-multiple-empty-lines': [
				'warn',
				{
					max: 1,
					maxEOF: 0,
				},
			],
			'no-trailing-spaces': ['warn', { ignoreComments: true }],
			'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
			quotes: [
				'warn',
				'single',
				{
					avoidEscape: true,
					allowTemplateLiterals: true,
				},
			],
			semi: ['warn', 'never'],
		},
	},
]
