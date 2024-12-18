import { User } from './user';
import {
    Admin as AdminPrisma,
    User as UserPrisma,
} from '@prisma/client';

export class Admin {
    private id?: number;
    private user: User;

    static from({id, user}: AdminPrisma & {user: UserPrisma}) {
        return new Admin({
            id,
            user: User.from(user)
        });
    }
    constructor(admin: {id?: number, user: User}) {
        this.id = admin.id;
        this.user = admin.user;
    }

    getId(): number | undefined{
        return this.id;
    }

    getUser(): User {
        return this.user;
    }
}