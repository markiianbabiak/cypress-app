import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { ReportType } from "./Report";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
export class UserModel {
  @prop({ type: () => String, required: true })
  public userID!: string;

  @prop({ type: () => String, required: true })
  public email!: string;

  @prop({ type: () => String, required: true })
  public password!: string;

  @prop({ type: () => String, required: true })
  public username!: string;

  @prop({ type: () => String, enum: Role, required: true })
  public role!: Role;

  @prop({ type: () => String, enum: Role, required: false })
  public department?: ReportType | null;
}

export default getModelForClass(UserModel);
