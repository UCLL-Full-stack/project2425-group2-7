import {User} from '@types';

const registerUser = async (user: User) =>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

const userService= {
    registerUser,
}
export default userService;