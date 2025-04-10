import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { ReportStatus } from "../models/Report";

dotenv.config();

enum Type {
  STATUS = "STATUS",
  NOTES = "NOTES",
  STATUS_AND_NOTES = "STATUS_AND_NOTES",
}

export const generateEmail = async (
  emailTo: string,
  subject: string,
  title: string,
  status: ReportStatus | undefined,
  reviewNotes: string | undefined,
  owner: boolean
): Promise<void> => {
  let type = "";
  if (status && reviewNotes) {
    type = Type.STATUS_AND_NOTES;
  } else if (reviewNotes) {
    type = Type.NOTES;
  } else if (status) {
    type = Type.STATUS;
  }

  let message = "";

  if (owner) {
    // Messages for the owner
    if (type === Type.STATUS) {
      message = `
        <p>Hello from the Cypress app,</p>

        <p>We have an update of status for one of your reports (<strong>${title}</strong>)!</p>

        <p>Here's the new status of your report: <strong>${status}</strong></p>

        <p>Thank you,</p>
        <p>The Cypress App Team</p>
      `;
    } else if (type === Type.NOTES) {
      message = `
        <p>Hello from the Cypress app,</p>

        <p>We have an update of review notes for one of your reports (<strong>${title}</strong>)!</p>

        <p>Here's the notes on your report: <strong>${reviewNotes}</strong></p>

        <p>Thank you,</p>
        <p>The Cypress App Team</p>
      `;
    } else if (type === Type.STATUS_AND_NOTES) {
      message = `
        <p>Hello from the Cypress app,</p>

        <p>We have updates for one of your reports (<strong>${title}</strong>)!</p>

        <p>Here's the new status of your report: <strong>${status}</strong></p>
        <p>Here's the notes on your report: <strong>${reviewNotes}</strong></p>

        <p>Thank you,</p>
        <p>The Cypress App Team</p>
      `;
    }
  } else {
    // Messages for subscribers
    if (type === Type.STATUS) {
      message = `
        <p>Hello from the Cypress app,</p>

        <p>There is a status update for a report you are subscribed to (<strong>${title}</strong>)!</p>

        <p>Here's the new status of the report: <strong>${status}</strong></p>

        <p>Thank you,</p>
        <p>The Cypress App Team</p>
      `;
    } else if (type === Type.NOTES) {
      message = `
        <p>Hello from the Cypress app,</p>

        <p>There is a review notes update for a report you are subscribed to (<strong>${title}</strong>)!</p>

        <p>Here's the notes on the report: <strong>${reviewNotes}</strong></p>

        <p>Thank you,</p>
        <p>The Cypress App Team</p>
      `;
    } else if (type === Type.STATUS_AND_NOTES) {
      message = `
        <p>Hello from the Cypress app,</p>

        <p>There are updates for a report you are subscribed to (<strong>${title}</strong>)!</p>

        <p>Here's the new status of the report: <strong>${status}</strong></p>
        <p>Here's the notes on the report: <strong>${reviewNotes}</strong></p>

        <p>Thank you,</p>
        <p>The Cypress App Team</p>
      `;
    }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: emailTo,
    subject: subject,
    html: message, // Use html instead of text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export const generateNewReportEmail = async (
  emailTo: string,
  subject: string,
  title: string,
  range: number
): Promise<void> => {
  const message = `
    <p>Hello from the Cypress app,</p>

    <p>A new report(${title}) has been added within ${range} km of your subscription.</p>

    <p>Thank you,</p>
    <p>The Cypress App Team</p>
  `;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: emailTo,
    subject: subject,
    html: message, // Use html instead of text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
