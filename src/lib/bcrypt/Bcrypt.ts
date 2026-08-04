import * as bcrypt from 'bcrypt';
import { HashPasswd } from "./interface.ts";

class Bcrypt implements HashPasswd {
  constructor(
    private readonly saltRounds: number
  ) { }

  encrypt(password: string): string {
    const salt: string = bcrypt.genSaltSync(this.saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }

  compare(password: string, passwordEncrypted: string): boolean {
    return bcrypt.compareSync(password, passwordEncrypted);
  }
}

export { Bcrypt };
