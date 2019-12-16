module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: ["react", "react-hooks"],
	rules: {
		"react-hooks/rules-of-hooks": 0, // Checks rules of Hooks
		"react-hooks/exhaustive-deps": 0 //  Checks effect dependencies
	}
};
