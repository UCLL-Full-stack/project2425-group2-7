import { User } from "../../model/user";
import { Role } from "../../types";

describe("UserHappy", () => {
    test("given correct details when making new user then new user is made", () => {
        const user = new User({
            username: "johndoe",
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "password123",
            role: "ADMIN"
        });

        expect(user.getUsername()).toEqual("johndoe");
        expect(user.getFirstName()).toEqual("John");
        expect(user.getLastName()).toEqual("Doe");
        expect(user.getEmail()).toEqual("john@example.com");
        expect(user.getPassword()).toEqual("password123");
        expect(user.getRole()).toEqual("ADMIN");
    });

    test("equals method should return true for users with same username and email", () => {
        const user1 = new User({
            username: "johndoe",
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "password123",
            role: "ADMIN"
        });

        const user2 = new User({
            username: "johndoe",
            firstName: "Different",
            lastName: "Name",
            email: "john@example.com",
            password: "differentpassword",
            role: "CUSTOMER"
        });

        expect(user1.equals(user2)).toBeTruthy();
    });

    test("equals method should return false for users with different username or email", () => {
        const user1 = new User({
            username: "johndoe",
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "password123",
            role: "ADMIN"
        });

        const user2 = new User({
            username: "janedoe",
            firstName: "Jane",
            lastName: "Doe",
            email: "jane@example.com",
            password: "password123",
            role: "CUSTOMER"
        });

        expect(user1.equals(user2)).toBeFalsy();
    });
});

describe("UserUnhappy", () => {
    test("given empty username when making new user then throw error", () => {
        expect(() => {
            new User({
                username: "",
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "password123",
                role: "ADMIN"
            });
        }).toThrow("Username is required");
    });

    test("given whitespace username when making new user then throw error", () => {
        expect(() => {
            new User({
                username: "   ",
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "password123",
                role: "ADMIN"
            });
        }).toThrow("Username is required");
    });

    test("given empty firstName when making new user then throw error", () => {
        expect(() => {
            new User({
                username: "johndoe",
                firstName: "",
                lastName: "Doe",
                email: "john@example.com",
                password: "password123",
                role: "ADMIN"
            });
        }).toThrow("First name is required");
    });

    test("given empty lastName when making new user then throw error", () => {
        expect(() => {
            new User({
                username: "johndoe",
                firstName: "John",
                lastName: "",
                email: "john@example.com",
                password: "password123",
                role: "ADMIN"
            });
        }).toThrow("Last name is required");
    });

    test("given empty email when making new user then throw error", () => {
        expect(() => {
            new User({
                username: "johndoe",
                firstName: "John",
                lastName: "Doe",
                email: "",
                password: "password123",
                role: "ADMIN"
            });
        }).toThrow("Email is required");
    });

    test("given undefined role when making new user then throw error", () => {
        expect(() => {
            new User({
                username: "johndoe",
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "password123",
                role: undefined as unknown as Role
            });
        }).toThrow("Role is required");
    });
});