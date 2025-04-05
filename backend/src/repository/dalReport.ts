import Report, { ReportModel } from "../models/Report";

export const create = async (report: ReportModel) => {
  try {
    const savedReport = await Report.create(report);
    return savedReport;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const getAllActive = async () => {
  try {
    const statuses = ["PENDING", "IN_PROGRESS"];
    const reports = await Report.find({ status: { $in: statuses } });
    return reports;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const getAllByUser = async (userID: string) => {
  try {
    const reports = await Report.find({ userID: userID });
    return reports;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const update = async (
  reportID: string,
  report: Partial<ReportModel>
) => {
  try {
    const savedReport = await Report.updateOne({ reportID: reportID }, report);
    return savedReport;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

const dalReport = {
  create,
  getAllActive,
  getAllByUser,
  update,
};

export default dalReport;
