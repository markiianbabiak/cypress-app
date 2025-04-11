import { Router, Request, Response, RequestHandler } from "express";
import dalSubscription from "../repository/dalSubscription";
import Subscription from "../models/Subscription";

const router = Router();

const getAllHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const subscriptions = await Subscription.find();

  res.status(200).send(subscriptions);
  return;
};

router.get("/all/", getAllHandler);

const subscribeToUpdatesHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const subscription = req.body;
  console.log(subscription);
  const savedSubscription = await dalSubscription.createSubscription(
    subscription
  );

  if (!savedSubscription) {
    res.status(500).end("Subscription not created");
    return;
  } else {
    res.status(200).send(savedSubscription);
  }
};

router.post("/", subscribeToUpdatesHandler);

const getBySubscriptionIdHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const subscription = await dalSubscription.findBySubscriptionID(id);
  console.log(id + " " + subscription);
  if (!subscription) {
    res.sendStatus(404);
  } else {
    res.status(200).send(subscription);
  }
};

router.get("/:id", getBySubscriptionIdHandler);

const deleteSubscriptionHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ID: string = req.params.subscriptionID;
  const savedSubscription = await Subscription.deleteOne({
    subscriptionID: ID,
  });

  res.status(200).send(savedSubscription);
  return;
};

router.delete("/:subscriptionID", deleteSubscriptionHandler);

export default router;
