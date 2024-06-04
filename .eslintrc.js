module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: 'airbnb-base',
	parserOptions: {
		ecmaVersion: 2023,
	},
	rules: {
		indent: [
			'error',
			'tab',
		],
		'no-tabs': 0,
		'max-len': 0,
		'no-use-before-define': [
			'error',
			{
				variables: false,
			},
		],
		'import/extensions': [
			'error',
			{
				mjs: 'always',
				js: 'never',
			},
		],
	},
	ignorePatterns: [
		'*.min.js',
	],
};
