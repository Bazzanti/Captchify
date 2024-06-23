module.exports = {
    extends: ["standard-with-typescript","prettier"],
    parserOptions: {
    project: "./tsconfig.json",
    sourceType: 'module',
    },
    ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
    rules: {
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    },
   };