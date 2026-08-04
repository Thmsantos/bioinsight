import { encrypt } from "../../config/env.ts";
import { Bcrypt } from "./Bcrypt.ts";

const hashPasswd: Bcrypt = new Bcrypt(encrypt.defaultSalt);

export { hashPasswd };