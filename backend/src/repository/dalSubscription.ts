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

const dalSubscription = {
  createSubscription,
};

export default dalSubscription;
