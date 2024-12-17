import {User} from '@types';
import {UserInputLogin} from "@types";

const registerUser = async (user: User) =>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}


const loginUser = ({username, password}: UserInputLogin) => {
    const user = { username, password };
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const userService= {
    registerUser,
    loginUser,
    

}
export default userService;