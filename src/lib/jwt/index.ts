import Jwt from "./Jwt.ts";

const jwt = new Jwt(
    process.env.JWT_SECRET_KEY!
);

export { jwt };