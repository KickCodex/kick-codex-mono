import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const afterLogIn = Prisma.defineExtension({
    name: 'afterLogIn',
    model: {
        user: {
            async afterLogIn(user: AfterLogInUser, account: AfterLogInAccount | null) {
                if (!account) return false;
                const existingUser = await prisma.user.findFirst({
                    where: {
                        providerName: account.provider,
                        providerUid: account.providerAccountId,
                    },
                });
                if (existingUser) {
                    return !existingUser.isBanned;
                }
                await prisma.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        providerName: account.provider,
                        providerUid: account.providerAccountId,
                    },
                });

                return true;
            },
        },
    },
});
export type AfterLogInUser = {
    name: string;
    email: string;
    image?: string | null | undefined;
};
export type AfterLogInAccount = {
    provider: string;
    providerAccountId: string;
};
