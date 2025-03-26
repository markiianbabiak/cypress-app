import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CityReport from '../models/cityReport';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  async getOneById(id: string): Promise<CityReport | undefined> {
    return lastValueFrom(this.http.get<CityReport>('report/' + id)).catch(
      () => undefined
    );
  }

  async getByUser(userID: string): Promise<CityReport[] | undefined> {
    return lastValueFrom(
      this.http.get<CityReport[]>('report/user/' + userID)
    ).catch(() => undefined);
  }

  async getAll(): Promise<CityReport[] | undefined> {
    return lastValueFrom(this.http.get<CityReport[]>('report/all')).catch(
      () => undefined
    );
  }

  async create(cityReport: CityReport): Promise<CityReport | undefined> {
    return lastValueFrom(
      this.http.post<CityReport>('report/', cityReport)
    ).catch(() => undefined);
  }

  async update(
    id: string,
    cityReport: Partial<CityReport>
  ): Promise<CityReport | undefined> {
    return lastValueFrom(
      this.http.post<CityReport>('report/' + id, cityReport)
    ).catch(() => undefined);
  }
}
