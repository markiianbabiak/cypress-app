import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Subscription } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  async getOneById(id: string): Promise<Subscription> {
    return lastValueFrom(this.http.get<Subscription>('subscription/' + id));
  }

  async getAll(): Promise<Subscription[]> {
    return lastValueFrom(this.http.get<Subscription[]>('subscription/all/'));
  }
}
