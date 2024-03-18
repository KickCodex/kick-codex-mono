import NextAuth from 'next-auth';

import { authOptions } from '@webApp/config/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
