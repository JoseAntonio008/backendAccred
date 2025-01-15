const { ReportAr, Notifications } = require("../models");
const { Op, where } = require("sequelize");

const fetchAdmin = async () => {
  try {
    const results = await ReportAr.findAll({
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
    const results = await ReportAr.findAll({
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
    const find = await ReportAr.findByPk(id);
    if (!find) throw new Error("No ID found");

    const toApproved = await ReportAr.update(
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
    const find = await ReportAr.findByPk(id);
    if (!find) throw new Error("No ID found");

    const toApproved = await ReportAr.update(
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
    const findPdf = await ReportAr.findByPk(id);
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
const arChartsCCST = async () => {
  try {
    const ccstCharts = await ReportAr.findAndCountAll({
      where:{
        department:"CCST",
        status:"approved"
      }
    })
    const score = ccstCharts.count * 5
    console.log(score);
    return {
      message:`CCST raw count ${ccstCharts}`,
      data:score
    }
  } catch (error) {
    return {
      message:"error occurred",
      error:error.message
    }
  }
}
const arChartsCTHM = async () => {
  try {
    const CTHMCharts = await ReportAr.findAndCountAll({
      where:{
        department:"CTHM",
        status:"approved"
      }
    })
    const score = CTHMCharts.count * 5
    console.log(score);
    return {
      message:`CTHM raw count ${CTHMCharts}`,
      data:score
    }
  } catch (error) {
    return {
      message:"error occurred",
      error:error.message
    }
  }
}
const arChartsCTED = async () => {
  try {
    const CTEDCharts = await ReportAr.findAndCountAll({
      where:{
        department:"CTED",
        status:"approved"
      }
    })
    const score = CTEDCharts.count * 5
    console.log(score);
    return {
      message:`CTED raw count ${CTEDCharts}`,
      data:score
    }
  } catch (error) {
    return {
      message:"error occurred",
      error:error.message
    }
  }
}
const arChartsCAS = async () => {
  try {
    const CASCharts = await ReportAr.findAndCountAll({
      where:{
        department:"CAS",
        status:"approved"
      }
    })
    const score = CASCharts.count * 5
    console.log(score);
    return {
      message:`CAS raw count ${CASCharts}`,
      data:score
    }
  } catch (error) {
    return {
      message:"error occurred",
      error:error.message
    }
  }
}
const arChartsCHK = async () => {
  try {
    const CHKCharts = await ReportAr.findAndCountAll({
      where:{
        department:"CHK",
        status:"approved"
      }
    })
    const score = CHKCharts.count * 5
    console.log(score);
    return {
      message:`CHK raw count ${CHKCharts}`,
      data:score
    }
  } catch (error) {
    return {
      message:"error occurred",
      error:error.message
    }
  }
}
const arChartsCOE = async () => {
  try {
    const COECharts = await ReportAr.findAndCountAll({
      where:{
        department:"COE",
        status:"approved"
      }
    })
    const score = COECharts.count * 5
    console.log(score);
    return {
      message:`COE raw count ${COECharts}`,
      data:score
    }
  } catch (error) {
    return {
      message:"error occurred",
      error:error.message
    }
  }
}
const arChartsCOA = async () => {
  try {
    const COACharts = await ReportAr.findAndCountAll({
      where:{
        department:"COA",
        status:"approved"
      }
    })
    const score = COACharts.count * 5
    console.log(score);
    return {
      message:`COA raw count ${COACharts}`,
      data:score
    }
  } catch (error) {
    return {
      message:"error occurred",
      error:error.message
    }
  }
}
const arChartsCNHS = async () => {
  try {
    const CNHSCharts = await ReportAr.findAndCountAll({
      where:{
        department:"CNHS",
        status:"approved"
      }
    })
    const score = CNHSCharts.count * 5
    console.log(score);
    return {
      message:`CNHS raw count ${CNHSCharts}`,
      data:score
    }
  } catch (error) {
    return {
      message:"error occurred",
      error:error.message
    }
  }
}
module.exports = {
  fetchAdmin,
  fetchUser,
  processReportApproved,
  processReportRejected,
  viewPdf,
  arChartsCCST,
  arChartsCAS,
  arChartsCHK,
  arChartsCNHS,
  arChartsCOA,
  arChartsCOE,
  arChartsCTED,
  arChartsCTHM
};
