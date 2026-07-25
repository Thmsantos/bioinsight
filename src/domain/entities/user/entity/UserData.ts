import { BaseData } from "../../base/BaseData.ts";

export interface UserData extends BaseData {
  email: string;
  password: string;
}
