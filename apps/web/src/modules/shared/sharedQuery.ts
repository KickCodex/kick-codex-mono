import { prisma } from '@repo/prisma-database/shared';
import { getServerSession } from 'next-auth';

import { authOptions } from '@webApp/config/authOptions';

type SaveContributionParams = {
    model: string;
    id: number;
    type: 'updated' | 'created';
    name: string;
    userId: number;
};

export const saveContribution = async ({ model, id, type, name, userId }: SaveContributionParams) => {
    await prisma.contribution.create({
        data: {
            userId,
            type,
            foreignModel: model,
            foreignId: id,
            description: `${type} ${model} ${name}`,
        },
    });
};

export const getUserId = async (): Promise<number> => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.dbUid) {
        throw new Error('Can not assert user id');
    }

    return session.user.dbUid;
};
