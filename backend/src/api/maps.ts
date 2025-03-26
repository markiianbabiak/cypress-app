import { RequestHandler, Router, Request, Response } from "express";
import dotenv from "dotenv";

const router = Router();

dotenv.config();
const googleMapsApi = `${process.env.GOOGLE_MAPS_API}`;

const mapsHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // The frontend needs only to know if the script can be loaded.
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApi}&libraries=places,marker`;

    // Send back the URL of the script
    res.json({ scriptUrl });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to load Google Maps script" });
    return;
  }
};

router.get("/", mapsHandler);
export default router;
