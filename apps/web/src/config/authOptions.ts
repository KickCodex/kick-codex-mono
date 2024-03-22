import { connectIfNeeded } from '@repo/typeorm-database/conn';
import { UserEntity } from '@repo/typeorm-database/entities';
import { NextUser, UserLogInService } from '@repo/typeorm-database/services';
import { AuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

import { appConfig } from '@webApp/config/appConfig';

export const authOptions: AuthOptions = {
    secret: appConfig.auth.secret,
    pages: {},
    callbacks: {
        async signIn({ user, account, email, profile }) {
            if (!user.email || !account) {
                return false;
            }

            await connectIfNeeded();
            const userLoginService = new UserLogInService(user as NextUser, account);
            const dbUser = await userLoginService.getDbUser();
            return !dbUser.isBanned;
        },
        async jwt({ token, account, profile, session }) {
            if (!token.dbUid && token.email) {
                await connectIfNeeded();
                const dbUser = await UserEntity.findOneByOrFail({ email: token.email });
                token.dbUid = dbUser.id;
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
