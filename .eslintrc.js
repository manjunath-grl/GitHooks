const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: ["plugin:react/recommended", "standard-with-typescript"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "single"],
    "valid-jsdoc": [
      ERROR,
      {
        requireReturn: false,
        requireReturnDescription: false,
        requireParamDescription: true,
        prefer: {
          return: "returns",
        },
      },
    ],
    "semi-spacing": [WARN, { before: false, after: true }],
    semi: [ERROR, "always"],
    "sort-vars": OFF,
    "space-before-blocks": [WARN, "always"],
    "space-before-function-paren": [WARN, "never"],
    "space-in-parens": [WARN, "never"],
    "space-infix-ops": [WARN, { int32Hint: true }],
  },
};
