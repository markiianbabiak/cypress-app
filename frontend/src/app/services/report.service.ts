import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CityReport, { ReportStatus } from '../models/cityReport';
import { last, lastValueFrom, Observable } from 'rxjs';

interface SendEmail {
  email: string;
  subject: string;
  reportStatus: ReportStatus;
  reviewNotes: string;
  owner: boolean;
  title: string;
}

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
    return lastValueFrom(this.http.get<CityReport[]>('report/all/')).catch(
      () => undefined
    );
  }

  async getAllActive(): Promise<Object | undefined> {
    return lastValueFrom(this.http.get<Object>('report/all/active/')).catch(
      () => undefined
    );
  }

  async create(cityReport: CityReport): Promise<CityReport | undefined> {
    const report = lastValueFrom(
      this.http.post<CityReport>('report/', cityReport)
    ).catch(() => undefined);
    if (!report) {
      return undefined;
    }
    return report;
  }

  async update(
    id: string,
    cityReport: Partial<CityReport>
  ): Promise<CityReport | undefined> {
    return lastValueFrom(
      this.http.post<CityReport>('report/' + id, cityReport)
    ).catch(() => undefined);
  }

  async sendEmail(
    email: string,
    subject: string,
    reportStatus: ReportStatus | undefined,
    reviewNotes: string | undefined,
    owner: boolean,
    title: string
  ): Promise<boolean> {
    let emailData;
    emailData = {
      email,
      subject,
      reportStatus,
      reviewNotes,
      owner,
      title,
    };
    console.log('Sending email data:', emailData);
    return lastValueFrom(
      this.http.post<{ success: boolean }>('report/sendUpdate/', emailData)
    )
      .then((result) => {
        if (result) {
          console.log('email sent successfully');
        }
        return true;
      })
      .catch(() => false);
  }

  async delete(id: string): Promise<CityReport | undefined> {
    return lastValueFrom(this.http.delete<CityReport>('report/' + id)).then(
      (deletedPost) => deletedPost ?? ({} as CityReport)
    );
  }
}
