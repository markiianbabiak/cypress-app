import { RequestHandler, Router, Request, Response } from "express";
import { ReportModel, ReportStatus } from "../models/Report";
import dalReport from "../repository/dalReport";
import { generateEmail } from "../utils/emails";

const router = Router();

interface sendEmail {
  email: string;
  subject: string;
  reportStatus: ReportStatus | undefined;
  reviewNotes: string | undefined;
  owner: boolean;
  title: string;
}

const sendEmailHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, subject, reportStatus, reviewNotes, owner, title } =
    req.body as sendEmail;
  if (
    !email ||
    !subject ||
    !owner ||
    !title ||
    (!reportStatus && !reviewNotes)
  ) {
    res.status(400).send({ success: false });
    return;
  }
  try {
    await generateEmail(
      email,
      subject,
      title,
      reportStatus,
      reviewNotes,
      owner
    );
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
    });
  }
};

router.post("/sendUpdate/", sendEmailHandler);

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

const getAllActiveHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const reports = await dalReport.getAllActive();

  res.status(200).send({ reports });
  return;
};

router.get("/all/active/", getAllActiveHandler);

const getAllByUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userID: string = req.params.userID;
  const reports = await dalReport.getAllByUser(userID);

  res.status(200).send({ reports });
  return;
};

router.get("/user/:userID", getAllByUser);

const updateReportHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const report: Partial<ReportModel> = req.body;
  const reportID: string = req.params.reportID;
  const savedReport = await dalReport.update(reportID, report);
  res.status(200).send({ savedReport });
  return;
};

router.post("/:reportID", updateReportHandler);

const deleteReportHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const reportID: string = req.params.reportID;
  const savedReport = await dalReport.deleteReport(reportID);

  res.status(200).send({ savedReport });
  return;
};

router.delete("/:reportID", deleteReportHandler);

const getAllHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const reports = await dalReport.getAll();

  res.status(200).send(reports);
};

router.get("/all/", getAllHandler);

export default router;
