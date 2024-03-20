export const appConfig = {
    appUrl: String(process.env.URL || 'http://localhost:3000'),
    auth: {
        secret: String(process.env.NEXTAUTH_SECRET),
        facebook: {
            clientId: String(process.env.FACEBOOK_CLIENT_ID),
            clientSecret: String(process.env.FACEBOOK_CLIENT_SECRET),
        },
        google: {
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        },
    },
};
