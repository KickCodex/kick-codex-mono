/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ['@repo/ui'],
    experimental: {
        serverComponentsExternalPackages: ['typeorm'],
    },
    typescript: {},
    webpack: (config, { isServer }) => {
        // Ignore problematic modules causing critical dependency warnings
        config.resolve.alias['react-native-sqlite-storage'] = false;
        config.resolve.alias['@sap/hana-client/extension/Stream'] = false;
        config.resolve.alias['mysql'] = false;

        // Suppress "Critical dependency" warnings for the specified modules
        config.ignoreWarnings = [/Critical dependency: the request of a dependency is an expression/];

        return config;
    },
};
