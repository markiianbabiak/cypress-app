import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

export enum ReportPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum ReportStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  REFUSED = "REFUSED",
}

export enum ReportType {
  INFRUSTRUCTURE = "INFRUSTRUCTURE",
  TRAFFIC_AND_TRANSPORTATION = "TRAFFIC_AND_TRANSPORTATION",
  PUBLIC_UTILITIES_AND_SERVICES = "PUBLIC_UTILITIES_AND_SERVICES",
  WASTE_MANAGEMENT = "WASTE_MANAGEMENT",
  PUBLIC_SPACES_AND_PARKS = "PUBLIC_SPACES_AND_PARKS",
  WEATHER_AND_NATURAL_DISASTERS = "WEATHER_AND_NATURAL_DISASTERS",
  PUBLIC_SAFETY = "PUBLIC_SAFETY",
  ANIMAL_AND_WILDLIFE = "ANIMAL_AND_WILDLIFE",
  OTHER = "OTHER",
}

@modelOptions({ schemaOptions: { collection: "reports", timestamps: true } })
export class ReportModel {
  @prop({ type: () => String, required: true })
  public reportID!: string;

  @prop({ type: () => String, required: true })
  public name!: string;

  @prop({ type: () => String, enum: ReportType, required: true })
  public type!: string;

  @prop({ type: () => String, required: false })
  public other_type?: string;

  @prop({ type: () => String, enum: ReportStatus, required: true })
  public status!: ReportStatus;

  @prop({ type: () => String, enum: ReportPriority, required: true })
  public priority!: ReportPriority;

  @prop({ type: () => String, required: true })
  public description!: String;

  @prop({ type: () => String, required: true })
  public userID!: string;

  @prop({ type: () => String, required: true })
  public location!: string;

  @prop({ type: () => Number, required: true })
  public latitude!: number;

  @prop({ type: () => Number, required: true })
  public longitude!: number;

  @prop({ type: () => Date })
  public submittedAt!: Date;
}

export default getModelForClass(ReportModel);
