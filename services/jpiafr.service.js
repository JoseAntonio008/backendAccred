const { JpiaFr, Notifications } = require("../models");
const { Op, where } = require("sequelize");

const fetchAdmin = async () => {
  try {
    const results = await JpiaFr.findAll({
      // where: {
      //   status: "pending",
      // },
      attributes: { exclude: ["fileData"] },
    });
    if (results.length == 0) {
      return {
        message: "no reports found",
        data: "no reports found",
      };
    }
    return {
      message: "fetch successfully",
      data: results,
    };
  } catch (error) {
    return {
      message: "error occured",
      error: error.message,
    };
  }
};
const fetchUser = async ({ department }) => {
  try {
    const results = await JpiaFr.findAll({
      attributes: { exclude: ["fileData"] },
      where: {
        department: { [Op.in]: department },
      },
    });
    if (results.length == 0) {
      return {
        message: "no reports found",
        status: "success",
        data: "empty",
      };
    }
    return {
      message: "fetch successfully",
      status: "success",
      data: results,
    };
  } catch (error) {
    return {
      message: "error occured",
      error: error.message,
    };
  }
};
const processReportApproved = async ({ id, department }) => {
  try {
    const find = await JpiaFr.findByPk(id);
    if (!find) throw new Error("No ID found");

    const toApproved = await JpiaFr.update(
      { status: "approved" },
      { where: { id: find.id } }
    );
    const notify = await Notifications.create({
      title: `AR: Request for Approval`,
      message: `your Request was Approved, Title: ${find.title}`,
      department: department,
    });

    return {
      message: `AR approved title: ${find.title} by ${find.department}`,
      data: toApproved,
      statusMsg: "success",
    };
  } catch (error) {
    console.error("Error in processReportApproved:", error.message);
    return {
      message: "An error occurred while processing the report",
      error: error.message, // Ensure it's a string
      statusMsg: "error",
    };
  }
};
const processReportRejected = async ({ id, department }) => {
  try {
    const find = await JpiaFr.findByPk(id);
    if (!find) throw new Error("No ID found");

    const toApproved = await JpiaFr.update(
      { status: "rejected" },
      { where: { id: find.id } }
    );

    const notify = await Notifications.create({
      title: `Request`,
      message: `your Request was Rejected, Title: ${find.title}`,
      department: department,
    });

    return {
      message: `AR Rejected title: ${find.title} by ${find.department}`,
      data: toApproved,
      statusMsg: "success",
    };
  } catch (error) {
    console.error("Error in processReportApproved:", error.message);
    return {
      message: "An error occurred while processing the report",
      error: error.message, // Ensure it's a string
      statusMsg: "error",
    };
  }
};

const viewPdf = async ({ id }) => {
  try {
    const findPdf = await JpiaFr.findByPk(id);
    if (!findPdf) throw new Error("no found id");

    return {
      message: "pdf located",
      data: findPdf.fileData,
    };
  } catch (error) {
    return {
      message: "error occured",
      error: error.message,
    };
  }
};
module.exports = {
  fetchAdmin,
  fetchUser,
  processReportApproved,
  processReportRejected,
  viewPdf,
};
