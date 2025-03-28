import { AuthUser } from './user';

export enum ReportPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum ReportStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  REFUSED = 'REFUSED',
}

export enum ReportType {
  INFRUSTRUCTURE = 'INFRUSTRUCTURE',
  TRAFFIC_AND_TRANSPORTATION = 'TRAFFIC_AND_TRANSPORTATION',
  PUBLIC_UTILITIES_AND_SERVICES = 'PUBLIC_UTILITIES_AND_SERVICES',
  WASTE_MANAGEMENT = 'WASTE_MANAGEMENT',
  PUBLIC_SPACES_AND_PARKS = 'PUBLIC_SPACES_AND_PARKS',
  WEATHER_AND_NATURAL_DISASTERS = 'WEATHER_AND_NATURAL_DISASTERS',
  PUBLIC_SAFETY = 'PUBLIC_SAFETY',
  ANIMAL_AND_WILDLIFE = 'ANIMAL_AND_WILDLIFE',
  OTHER = 'OTHER',
}

export default class CityReport {
  reportID!: string;
  name!: string;
  type!: ReportType;
  other_type?: string;
  status!: ReportStatus;
  priority!: ReportPriority;
  description!: string;
  userID!: string;
  location!: string;
  latitude!: number;
  longitude!: number;
  submittedAt?: string;
}
