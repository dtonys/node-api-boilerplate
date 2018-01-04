'use strict';

module.exports = {
  "extends": "eslint-config-airbnb-base",
  "env": {
    "node": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "rules": {
    //
    // Safety
    //
    // Warn about unused variables. An unused variable is generally a sign of an error.
    "no-unused-vars": "warn",
    // Warn about `alert` calls, we don't want them in production code. Use `eslint-disable-line no-alert` in development-only code.
    "no-alert": "warn",
    // Use the `eslint-disable-line no-console` comment for intentional console statements.
    "no-console": "warn",
    // The `no-use-before-define` prevents variable and function use before definition.
    "no-use-before-define": "warn",
    // The `no-var` enforces `const` and `let`. Use `eslint-disable-line no-var` if required in untranspiled Node.js scripts only.
    "no-var": "warn",
    // The `block-scoped-var` warns about possibly invalid logic when `var` is declared in a block scope and used outside. We prefer `const` and `let` over `var` but keep this for now.
    "block-scoped-var": "warn",
    // Disable `guard-for-in` because we use `Object.keys().forEach` and do not have to extend `Object.prototype` for older browsers.
    "guard-for-in": "off",
    // Warn about using the outer scope variable name for an inner scope variable.
    "no-shadow": "warn",
    // Disable `no-param-reassign` to avoid useless renaming. Be careful.
    "no-param-reassign": "off",

    //
    // Coding style
    //
    "indent": [ "warn", 2, { "SwitchCase": 1 } ],
    "padded-blocks": "off",
    // The `spaced-comment` warns about the commented-out source code and dirty comments.
    "spaced-comment": "warn",
    // The `comma-dangle` helps to keep version control clean if array or object items are added or removed - only the lines that are actually changed will be highlighted.
    "comma-dangle": [ "warn", "always-multiline" ],
    "space-in-parens": "off",
    // TODO: Re-enable `curly` and fix.
    "curly": [ "off", "all" ],
    "array-bracket-spacing": [ "warn", "always" ],
    "object-curly-spacing": [ "warn", "always" ],
    "computed-property-spacing": "off",
    "brace-style": [ "warn", "stroustrup", { "allowSingleLine": true } ],
    "no-trailing-spaces": [ "warn", { "skipBlankLines": true } ],
    "linebreak-style": [ "warn", "unix" ],
    "no-multiple-empty-lines": [ "warn", { "max": 2, "maxEOF": 1 } ],
    "eol-last": [ "error", "unix" ],
    "id-length": [ "warn", { "min": 2, "exceptions": [ "_", "$", "i", "j", "k", "x", "y", "e", "t" ] } ],
    "camelcase": "warn",
    "func-names": "warn",
    "keyword-spacing": "warn",
    "space-before-blocks": "warn",
    "space-before-function-paren": [ "warn", { "anonymous": "always", "named": "never" } ],
    "quotes": [ "warn", "single", "avoid-escape" ],
    "no-multi-spaces": [ "warn", { "exceptions": { "VariableDeclarator": true, "ImportDeclaration": true } } ],
    "dot-notation": "off",
    "prefer-template": "off",
    "prefer-arrow-callback": "warn",
    "max-len": [ "warn", 250, 4, { "ignoreComments": true } ],
    "arrow-parens": [ "warn", "always" ],
    "arrow-body-style": "off",
    "object-shorthand": "off",
    "no-case-declarations": "warn",
    "no-nested-ternary": "off",
    "global-require": "off",
    "no-underscore-dangle": "off",
    "no-useless-concat": "off",
    "no-mixed-operators": "off",
    // NOTE: Keep bitwise, can use unary negation `~` for `indexOf`.
    "no-bitwise": "off",
    "no-plusplus": "off",
    "no-continue": "off",
    "newline-per-chained-call": "off",
    // WORKAROUND: airbnb disallows `for..of` https://github.com/airbnb/javascript/issues/1122#issuecomment-266219071 https://github.com/flying-sheep/eslint-config/blob/v2.0.1/defaults.js#L22
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    "lines-around-directive": "off",
    "class-methods-use-this": "off",

    //
    // ES6:
    //
    "import/first": "off",
    "import/default": "off",
    "import/no-duplicates": "error",
    "import/named": "error",
    "import/namespace": [ "error", { "allowComputed": false } ],
    "import/no-extraneous-dependencies": [ "error", {
      "devDependencies": true
    } ],
    "import/newline-after-import": "off",
    "import/imports-first": "off",
    "import/no-unresolved": [ "error", {} ],
    "import/no-named-as-default": "error",
    "import/extensions": [ "warn", "always", { "": "never", "js": "never" } ],
    "import/no-deprecated": "warn",
  },
  "plugins": [
    "import",
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "node_modules",
          "./src",
        ],
      },
    },
  },
};
