import Report, { ReportModel } from "../models/Report";

export const create = async (report: ReportModel) => {
  try {
    const savedReport = await Report.create(report);
    return savedReport;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

const dalReport = {
  create,
};

export default dalReport;
