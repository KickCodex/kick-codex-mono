/*
 * base eslint config for packages monorepo root
 */
const base = require("./base");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    ...base,
    extends: [
        ...base.extends,
        "universe/node",
    ],
    env: {
        node: true,
        browser: false,
    }
};
