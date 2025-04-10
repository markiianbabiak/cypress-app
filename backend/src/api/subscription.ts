import { Router, Request, Response, RequestHandler } from "express";
import dalSubscription from "../repository/dalSubscription";

const router = Router();

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

export default router;
