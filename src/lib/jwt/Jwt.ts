import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";
import { UserData } from "../../domain/entities/user/entity/UserData.ts";

const { sign, verify, decode } = jwt;

class Jwt<T = Partial<UserData>> {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: StringValue | number = "1h"
  ) {}

  public generate(payload: T): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn,
    };

    return sign(payload as object, this.secret, options);
  }

  public verify(token: string): T {
    return verify(token, this.secret) as T;
  }

  public decode(token: string): T | null {
    return decode(token) as T | null;
  }
}

export default Jwt;