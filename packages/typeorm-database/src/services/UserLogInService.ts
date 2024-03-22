import { UserEntity } from '../entities';
import { SocialProfileEntity } from '../entities/SocialProfileEntity';

export interface NextUser {
    name?: string | null;
    email: string;
    image?: string | null;
}

export interface NextAccount {
    provider: string;
    providerAccountId: string;
}

export class UserLogInService {
    nextUser: NextUser;
    nextAccount: NextAccount;

    constructor(nextUser: NextUser, nextAccount: NextAccount) {
        this.nextUser = nextUser;
        this.nextAccount = nextAccount;
    }

    async getDbUser(): Promise<UserEntity> {
        const user = await this.getUserByNext();
        if (!user) {
            return await this.createWithNext();
        }
        const socialProfile = user.socialProfiles.find(
            socialProfile =>
                socialProfile.providerName === this.nextAccount.provider &&
                socialProfile.providerUid === this.nextAccount.providerAccountId,
        );

        if (!socialProfile) {
            const newSocialProfile = await this.createSocialProfileFromNext(user);
            user.socialProfiles.push(newSocialProfile);
        }

        return user;
    }

    getUserByNext(): Promise<UserEntity | null> {
        return UserEntity.findOne({
            where: {
                email: this.nextUser.email,
            },
            relations: ['socialProfiles'],
        });
    }

    async createWithNext(): Promise<UserEntity> {
        const user = await this.createUserFromNext();
        const socialProfile = await this.createSocialProfileFromNext(user);
        user.socialProfiles = [socialProfile];
        return user;
    }

    async createUserFromNext(): Promise<UserEntity> {
        const user = UserEntity.create({
            name: this.nextName,
            email: this.nextUser.email,
            image: this.nextImage,
            isBanned: false,
        });

        await UserEntity.insert(user);
        return user;
    }

    async createSocialProfileFromNext(user: UserEntity): Promise<SocialProfileEntity> {
        const socialProfile = SocialProfileEntity.create({
            name: user.name,
            email: user.email,
            image: user.image,
            providerName: this.nextAccount.provider,
            providerUid: this.nextAccount.providerAccountId,
            userId: user.id,
        });

        await SocialProfileEntity.insert(socialProfile);
        return socialProfile;
    }

    get nextName(): string | null {
        const name = this.nextUser.name?.trim();
        if (!name || name === '') {
            return null;
        }
        return name;
    }

    get nextImage(): string | null {
        const image = this.nextUser.image?.trim();
        if (!image || image === '') {
            return null;
        }
        return image;
    }
}
