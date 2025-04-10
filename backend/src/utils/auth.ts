import { UserModel } from "../models/User";

export interface Token {
  email: string;
  username: string;
  userID: string;
  role: string;
  department: string | undefined | null;
}

export const userToToken = (user: UserModel): Token => {
  return {
    email: user.email,
    username: user.username,
    userID: user.userID,
    role: user.role,
    department: user.department,
  };
};

export const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("No JWT Secret environtment variable defined!");
  }

  return secret;
};

export const addHours = (numOfHours: number, date = new Date()) => {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
};
