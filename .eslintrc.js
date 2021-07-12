const path = require("path");

module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  globals: {
    "_": true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "tsconfig.json",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    "react",
    "react-hooks",
    "import",
    "@typescript-eslint",
    "promise",
    "prettier",
  ],
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:promise/recommended",
    "plugin:react/recommended",
  ],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            alias: {
              "~": path.join(__dirname, "src"),
              "~assets": path.join(__dirname, "src", "assets"),
              "~components": path.join(__dirname, "src", "components"),
              "~services": path.join(__dirname, "src", "services"),
            },
            extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
          },
        },
      },
    },
  },
  overrides: [
    {
      files: ["*.{js,jsx}"],
      rules: {
        "consistent-return": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      }
    }
  ],
  rules: {
    "eqeqeq": [2, "always"],
    "no-console": ["error", { "allow": ["log", "warn", "error"] }],
    "no-debugger": 2,
    "no-var": 1,
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "space-before-function-paren": ["off"],
    "comma-dangle": ["off"],
    "react/prop-types": "off",
    "import/order": ["error", {
      pathGroups: [
        {
          pattern: "react",
          group: "external",
          position: "before",
        },
        {
          pattern: "~**",
          group: "internal",
        },
        {
          pattern: ".**",
          group: "internal",
          position: "after",
        },
      ],
      pathGroupsExcludedImportTypes: ["react"],
      groups: [
        "builtin",
        "external",
        "internal",
        "unknown",
        "parent",
        "sibling",
        "index",
        "object",
        "type"
      ],
      "newlines-between": "always",
      alphabetize: {
        order: "asc",
        caseInsensitive: true
      },
    }],
    "import/prefer-default-export": "off",
    "import/no-default-export": 2,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        mjs: "never",
      },
    ],
    "prettier/prettier": "error"
  }
}
