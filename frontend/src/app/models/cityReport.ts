import { AuthUser } from './user';

export enum ReportPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export default class CityReport {
  reportID!: string;
  name!: string;
  type!: string;
  priority!: ReportPriority;
  description!: string;
  userID!: string;
  location!: string;
  submittedAt!: string;
}
