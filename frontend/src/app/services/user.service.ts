import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User, {
  AuthUser,
  Subscription,
  TokenResponse,
  UserUpdate,
} from '../models/user';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  redirectUrl: string | null = null;

  constructor(private http: HttpClient) {}

  async getOneById(id: string): Promise<User> {
    return lastValueFrom(this.http.get<User>('auth/' + id));
  }

  async register(user: User): Promise<boolean> {
    try {
      const result = await lastValueFrom(
        this.http.post<TokenResponse>('auth/register', user)
      );

      if (result) {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('access_token', result.token);
        localStorage.setItem('expires_at', result.expiresAt);
      }
      return true;
    } catch (error: any) {
      throw new Error(error?.error?.message || 'Something went wrong');
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    const result = await lastValueFrom(
      this.http.post<TokenResponse>('auth/login', { email, password })
    );

    if (result) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('access_token', result.token);
      localStorage.setItem('expires_at', result.expiresAt);
    }
    return true;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    const result = await lastValueFrom(
      this.http.post<UserUpdate>('auth/' + id, user)
    );
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(result.savedUser));
  }

  async checkPassword(id: string, password: string): Promise<boolean> {
    const result = await lastValueFrom(
      this.http.post<boolean>('auth/checkPassword/' + id, { password })
    );

    return result;
  }

  async subscribeToUpdates(subscription: Subscription) {
    const newSubscription = await lastValueFrom(
      this.http.post<Subscription>('subscription/', subscription)
    );

    const user: Partial<User> = {
      subscriptionID: subscription.subscriptionID,
    };
    await this.update(subscription.userID, user);

    return newSubscription;
  }

  async unsubscribeFromUpdates(subscription: Subscription) {
    const result = await lastValueFrom(
      this.http.delete('subscription/' + subscription.subscriptionID)
    );
    return result;
  }

  async delete(id: string): Promise<void> {
    await lastValueFrom(this.http.delete('auth/' + id));
  }

  public get loggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    const expiry = localStorage.getItem('expires_at');

    if (!expiry || !token) return false;

    const expiryAsNumber = new Date(expiry).getTime();

    return Date.now() < expiryAsNumber;
  }

  public get token(): string | null {
    return localStorage.getItem('access_token');
  }

  public get user(): AuthUser | null {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  }
}
