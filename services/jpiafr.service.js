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
      title: `Financial Report: Request for Approval`,
      message: `your Request was Approved, Title: ${find.title}`,
      department: department,
    });

    return {
      message: `Financial Report approved title: ${find.title} by ${find.department}`,
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
      message: `Financial Report Rejected title: ${find.title} by ${find.department}`,
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
const frChartsCCST = async () => {
  try {
    const ccstCharts = await JpiaFr.findAndCountAll({
      where: {
        department: "CCST",
        status: "approved",
      },
    });
    const score = ccstCharts.count * 5;
    console.log(score);
    return {
      message: `CCST raw count ${ccstCharts}`,
      data: score,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const frChartsCTHM = async () => {
  try {
    const CTHMCharts = await JpiaFr.findAndCountAll({
      where: {
        department: "CTHM",
        status: "approved",
      },
    });
    const score = CTHMCharts.count * 5;
    console.log(score);
    return {
      message: `CTHM raw count ${CTHMCharts}`,
      data: score,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const frChartsCTED = async () => {
  try {
    const CTEDCharts = await JpiaFr.findAndCountAll({
      where: {
        department: "CTED",
        status: "approved",
      },
    });
    const score = CTEDCharts.count * 5;
    console.log(score);
    return {
      message: `CTED raw count ${CTEDCharts}`,
      data: score,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const frChartsCAS = async () => {
  try {
    const CASCharts = await JpiaFr.findAndCountAll({
      where: {
        department: "CAS",
        status: "approved",
      },
    });
    const score = CASCharts.count * 5;
    console.log(score);
    return {
      message: `CAS raw count ${CASCharts}`,
      data: score,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const frChartsCHK = async () => {
  try {
    const CHKCharts = await JpiaFr.findAndCountAll({
      where: {
        department: "CHK",
        status: "approved",
      },
    });
    const score = CHKCharts.count * 5;
    console.log(score);
    return {
      message: `CHK raw count ${CHKCharts}`,
      data: score,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const frChartsCOE = async () => {
  try {
    const COECharts = await JpiaFr.findAndCountAll({
      where: {
        department: "COE",
        status: "approved",
      },
    });
    const score = COECharts.count * 5;
    console.log(score);
    return {
      message: `COE raw count ${COECharts}`,
      data: score,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const frChartsCOA = async () => {
  try {
    const COACharts = await JpiaFr.findAndCountAll({
      where: {
        department: "COA",
        status: "approved",
      },
    });
    const score = COACharts.count * 5;
    console.log(score);
    return {
      message: `COA raw count ${COACharts}`,
      data: score,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const frChartsCNHS = async () => {
  try {
    const CNHSCharts = await JpiaFr.findAndCountAll({
      where: {
        department: "CNHS",
        status: "approved",
      },
    });
    const score = CNHSCharts.count * 5;
    console.log(score);
    return {
      message: `CNHS raw count ${CNHSCharts}`,
      data: score,
    };
  } catch (error) {
    return {
      message: "error occurred",
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
  frChartsCCST,
  frChartsCAS,
  frChartsCHK,
  frChartsCNHS,
  frChartsCOA,
  frChartsCOE,
  frChartsCTED,
  frChartsCTHM,
};
