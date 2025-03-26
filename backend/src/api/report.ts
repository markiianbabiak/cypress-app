import { RequestHandler, Router, Request, Response } from "express";
import { ReportModel } from "../models/Report";
import dalReport from "../repository/dalReport";

const router = Router();

const createReportHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const report: ReportModel = req.body;
  const savedReport = await dalReport.create(report);

  res.status(200).send({ savedReport });
  return;
};

router.post("/", createReportHandler);

export default router;
