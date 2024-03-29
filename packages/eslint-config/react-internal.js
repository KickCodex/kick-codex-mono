/*
 * base eslint config for internal (bundled by their consumer) libraries that utilize React.
 */
const base = require("./base");
/** @type {import("eslint").Linter.Config} */
module.exports = {
    ...base,
    extends: [
        ...base.extends,
        'universe/web',
    ],
    env: {
        node: false,
        browser: true,
    }
};
