import { ReportType } from './cityReport';

export interface AuthUser {
  userID: string;
  email: string;
  username: string;
  role: string;
  department: ReportType | undefined;
  subscriptionID: string | undefined;
}

export interface Subscription {
  subscriptionID: string;
  userID: string;
  address: string;
  latitude: number;
  longitude: number;
  range: number;
}

export interface TokenResponse {
  token: string;
  expiresAt: string;
  user: AuthUser;
}

export interface UserUpdate {
  savedUser: AuthUser;
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
  department?: ReportType | null;
  subscriptionID?: string | null;
}
