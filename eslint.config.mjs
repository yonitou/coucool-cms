import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

// ts-prune-ignore-next
export default [
	js.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	eslintPluginPerfectionist.configs["recommended-alphabetical"],
	eslintPluginUnicorn.configs.recommended,
	eslintConfigPrettier,
	react.configs.flat.recommended,
	react.configs.flat["jsx-runtime"],
	reactHooks.configs.flat.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: "latest",
				project: ["./tsconfig.json"],
				sourceType: "module",
			},
		},
		rules: {
			"@typescript-eslint/consistent-indexed-object-style": "off",
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					fixStyle: "inline-type-imports",
					prefer: "type-imports",
				},
			],
			"@typescript-eslint/no-extraneous-class": "off",
			"@typescript-eslint/no-misused-spread": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "after-used",
					ignoreRestSiblings: true,
					vars: "all",
				},
			],
			"@typescript-eslint/non-nullable-type-assertion-style": "off",
			"@typescript-eslint/prefer-nullish-coalescing": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/unbound-method": "off",

			"no-console": "error",
			"no-param-reassign": ["error", { props: true }],
			"padding-line-between-statements": [
				"error",
				{ blankLine: "always", next: "return", prev: "*" },
				{ blankLine: "always", next: "*", prev: ["const", "let"] },
				{ blankLine: "always", next: ["const", "let"], prev: "*" },
				{
					blankLine: "any",
					next: ["const", "let"],
					prev: ["const", "let"],
				},
				{ blankLine: "always", next: ["block-like"], prev: "block-like" },
				{
					blankLine: "never",
					next: "block-like",
					prev: ["case", "default"],
				},
				{ blankLine: "always", next: "if", prev: "*" },
				{ blankLine: "always", next: "*", prev: "if" },
			],

			"react/jsx-no-useless-fragment": "off",
			"react/prop-types": "off",

			"unicorn/consistent-function-scoping": "off",
			"unicorn/filename-case": [
				"error",
				{
					cases: {
						camelCase: true,
						pascalCase: true,
					},
				},
			],
			"unicorn/no-array-reduce": "off",
			"unicorn/no-array-sort": "off",
			"unicorn/no-null": "off",
			"unicorn/no-process-exit": "off",
			"unicorn/prefer-global-this": "off",
			"unicorn/prefer-module": "off",
			"unicorn/prefer-top-level-await": "off",
			"unicorn/prevent-abbreviations": [
				"error",
				{
					ignore: ["props", "ref", "params", "args", "env"],
				},
			],
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		files: ["**/*.js", "**/*.mjs"],
		...tseslint.configs.disableTypeChecked,
	},
	{
		ignores: ["node_modules/**", ".sanity/**", "dist/**", "static/**"],
	},
];
