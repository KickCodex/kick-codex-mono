import { getServerSession } from 'next-auth';

import { authOptions } from '@webApp/config/authOptions';

export const getUserId = async (): Promise<number> => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.dbUid) {
        throw new Error('Can not assert user id');
    }

    return session.user.dbUid;
};
