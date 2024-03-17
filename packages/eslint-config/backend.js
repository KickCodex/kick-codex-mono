/*
 * base eslint config for node apps
 */
const base = require("./base");
/** @type {import("eslint").Linter.Config} */
module.exports = {
    ...base,
    extends: [
        // Ensure base.extends is always spread as an array
        ...(Array.isArray(base.extends) ? base.extends : base.extends ? [base.extends] : []),
        "universe/node",
    ],
    env: {
        node: true,
    }
};