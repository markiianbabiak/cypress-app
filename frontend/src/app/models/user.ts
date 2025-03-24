export interface AuthUser {
  userID: string;
  email: string;
  username: string;
  role: string;
}

export interface TokenResponse {
  token: string;
  expiresAt: string;
  user: AuthUser;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export default class User {
  userID!: string;
  email!: string;
  password!: string;
  username!: string;
  role!: Role;
}

export class Admin extends User {
  department!: string;
}
