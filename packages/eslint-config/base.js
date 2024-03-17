/*
 * base eslint config for packages, apps and root
 */
const {resolve} = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: false,
    parser: "@typescript-eslint/parser",
    extends: ["eslint:recommended", "eslint-config-turbo"],
    plugins: ["only-warn"],
    globals: {
        React: true,
        JSX: true,
    },
    env: {
        node: false,
        browser: false,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    overrides: [{files: ["*.js?(x)", "*.ts?(x)"]}],
    ignorePatterns: [
        // Ignore dotfiles
        ".*.js",
        "node_modules/",
        "dist/",
    ],
    rules: {
        "prettier/prettier": [
            "error",
            {
                "singleQuote": true,
                "trailingComma": "all",
                "arrowParens": "avoid",
                "semi": true,
                "useTabs": false,
                "tabWidth": 4,
                "printWidth": 120
            }
        ],
    }
};
