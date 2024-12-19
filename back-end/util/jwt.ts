import jwt from "jsonwebtoken";
import {JWTPayload} from "../types";

const generateJwtToken = ({username, role, userId}: JWTPayload): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'dealership app'}

    try {
        return jwt.sign({username, role, userId}, process.env.JWT_SECRET as string, options);
    } catch(error) {
        console.log(error);
        throw new Error("Error generating JWT token")
    }
}

export default {
    generateJwtToken,
}