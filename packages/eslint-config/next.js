/*
 * base eslint config for NExt.js apps
 */
const reactInternal = require("./react-internal");
/** @type {import("eslint").Linter.Config} */
module.exports = {
    ...reactInternal,
    extends: [
        ...reactInternal.extends,
        require.resolve("@vercel/style-guide/eslint/next"),
        "universe/node",
    ],
    env: {
        ...reactInternal.env,
        node: true,
    }
};
