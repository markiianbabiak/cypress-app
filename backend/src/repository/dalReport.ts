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
    const savedReport = await Report.findOneAndUpdate(
      { reportID: reportID },
      report,
      { new: true }
    );
    return savedReport;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const deleteReport = async (reportID: string) => {
  try {
    const savedReport = await Report.deleteOne({ reportID: reportID });
    return savedReport;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const getAll = async () => {
  try {
    const reports = await Report.find();
    return reports;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const findDuplicate = async (report: ReportModel) => {
  const found = await Report.findOne({
    location: report.location,
    type: report.type,
  });
  console.log(found);
  return found;
};

const dalReport = {
  findDuplicate,
  create,
  getAllActive,
  getAllByUser,
  update,
  deleteReport,
  getAll,
};

export default dalReport;
