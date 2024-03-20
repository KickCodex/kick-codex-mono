import { prisma } from '@repo/prisma-database/shared';
import { AuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

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
        async jwt({ token, account, profile, session }) {
            if (!token.dbUid && token.email) {
                const dbUser = await prisma.user.findFirst({
                    where: { email: token.email },
                });
                if (dbUser?.id) {
                    token.dbUid = dbUser.id;
                }
            }
            return token;
        },

        async session({ session, token, user }) {
            if (token) {
                session.user.dbUid = Number(token.dbUid);
            }
            return session;
        },
    },
    providers: [
        FacebookProvider({
            clientId: appConfig.auth.facebook.clientId,
            clientSecret: appConfig.auth.facebook.clientSecret,
        }),
        GoogleProvider({
            clientId: appConfig.auth.google.clientId,
            clientSecret: appConfig.auth.google.clientSecret,
        }),
    ],
};
