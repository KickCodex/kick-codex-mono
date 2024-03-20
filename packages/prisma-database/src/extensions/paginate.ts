import { Prisma } from '@prisma/client';

type PrismaPaginationOptions = {
    page?: number;
    limit?: number;
};

export type PaginationData = {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
};

export type PrismaPaginatedResult<T> = {
    items: T[];
    pagination: PaginationData;
};

type PaginateArgs<T, A> = Prisma.Exact<A, Prisma.Args<T, 'findMany'>> & { pagination?: PrismaPaginationOptions };

type PaginateResult<T, A> = {
    items: Prisma.Result<T, A, 'findMany'>;
    pagination: PaginationData;
};
export const paginate = Prisma.defineExtension({
    name: 'paginate-extension',
    model: {
        $allModels: {
            async paginate<T, A>(this: T, args?: PaginateArgs<T, A>): Promise<PaginateResult<T, A>> {
                const { pagination, ...rest } = (args ?? {}) as any;
                const restFindManyArgs = rest as Prisma.Args<T, 'findMany'>;
                const page = pagination?.page || 1;
                const limit = pagination?.limit || 10;
                const skip = limit * (page - 1);
                const context = Prisma.getExtensionContext(this);

                const findManyArgs: Prisma.Args<T, 'findMany'> = {
                    ...restFindManyArgs,
                    skip,
                    take: limit,
                };

                const countArgs = {
                    where: restFindManyArgs.where,
                };

                const items = await (context as any).findMany(findManyArgs);
                const totalItems = await (context as any).count(countArgs);

                return {
                    items,
                    pagination: {
                        page,
                        limit,
                        totalPages: Math.ceil(totalItems / limit),
                        totalItems,
                    },
                };
            },
        },
    },
});
