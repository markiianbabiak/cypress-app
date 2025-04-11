import Subscription, { SubscriptionModel } from "../models/Subscription";

export const createSubscription = async (
  subscription: SubscriptionModel
): Promise<SubscriptionModel> => {
  try {
    const savedSubscription = await Subscription.create(subscription);
    return savedSubscription;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const findBySubscriptionID = async (subscriptionID: string) => {
  try {
    const subscription: SubscriptionModel | null = await Subscription.findOne({
      subscriptionID: subscriptionID,
    });
    return subscription;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

const dalSubscription = {
  createSubscription,
  findBySubscriptionID,
};

export default dalSubscription;
