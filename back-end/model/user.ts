import { Role } from '../types';
import {
    User as UserPrisma,
} from '@prisma/client';

export class User {

    readonly id: number;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;

    static from({id, username, firstName, lastName, email, password, role}:UserPrisma) {
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
            role: role as Role
        })
    }
    constructor(user: {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
                }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }
    getId(): number {
        return this.id;
    }
    getRole(): Role {
        return this.role;
    }

    getUsername(): string {
        return this.username;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    validate(user: {
        username: string;
        firstName: string;
        password: string;
        lastName: string;
        email: string;
        role: Role;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }
    // unique values are username and email
    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.email === user.getEmail()
        );
    }

}