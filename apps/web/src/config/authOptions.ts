import { prisma } from '@repo/prisma-database/src';
import { AuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

import { appConfig } from '@webApp/config/appConfig';

export const authOptions: AuthOptions = {
    secret: appConfig.auth.secret,
    pages: {},
    callbacks: {
        async signIn({ user, account, email, credentials, profile }) {
            if (!user.email || !account) {
                return false;
            }
            const payload = {
                name: user.name || '',
                email: user.email!,
                image: user.image,
            };
            return await prisma.user.afterLogIn(payload, account);
        },
    },
    providers: [
        FacebookProvider({
            clientId: appConfig.auth.facebook.clientId,
            clientSecret: appConfig.auth.facebook.clientSecret,
        }),
    ],
};