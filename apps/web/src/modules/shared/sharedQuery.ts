import { prisma } from '@repo/prisma-database/shared';
import { getServerSession } from 'next-auth';

import { authOptions } from '@webApp/config/authOptions';

type SaveContributionParams = {
    model: string;
    id: number;
    type: 'updated' | 'created';
    name: string;
    userId: number;
    previous?: object | null;
    current?: object | null;
};

const calculateDiff = (original: Record<string, any>, current: Record<string, any>): Record<string, any> => {
    const diff: Record<string, any> = {};
    for (const key in original) {
        if (key !== 'createdAt' && key !== 'updatedAt' && original[key] !== current[key]) {
            diff[key] = { original: original[key], current: current[key] };
        }
    }
    return diff;
};
export const saveContribution = async ({
    model,
    id,
    type,
    name,
    userId,
    previous = {},
    current = {},
}: SaveContributionParams) => {
    const originalData = previous || {};
    const currentData = current || {};
    const diff = calculateDiff(originalData, currentData);
    await prisma.contribution.create({
        data: {
            userId,
            type,
            foreignModel: model,
            foreignId: id,
            description: `${type} ${model} ${name}`,
            originalData,
            currentData,
            diff,
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
