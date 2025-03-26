import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

export enum ReportPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

@modelOptions({ schemaOptions: { collection: "reports", timestamps: true } })
export class ReportModel {
  @prop({ type: () => String, required: true })
  public reportID!: string;

  @prop({ type: () => String, required: true })
  public name!: string;

  @prop({ type: () => String, required: true })
  public type!: string;

  @prop({ type: () => String, enum: ReportPriority, required: true })
  public priority!: ReportPriority;

  @prop({ type: () => String, required: true })
  public description!: String;

  @prop({ type: () => String, required: true })
  public userID!: string;

  @prop({ type: () => String, required: true })
  public location!: string;

  @prop({ type: () => Date })
  public submittedAt!: Date;
}

export default getModelForClass(ReportModel);
