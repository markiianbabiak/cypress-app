import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: { collection: "subscriptions", timestamps: true },
})
export class SubscriptionModel {
  @prop({ required: true })
  subscriptionID!: string;

  @prop({ required: true })
  userID!: string;

  @prop({ required: true })
  address!: string;

  @prop({ required: true })
  latitude!: number;

  @prop({ required: true })
  longitude!: number;

  @prop({ required: true })
  range!: number;
}

export default getModelForClass(SubscriptionModel);
