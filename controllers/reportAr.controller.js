const express = require("express");
const {
  fetchUser,
  processReportApproved,
  processReportRejected,
  viewPdf,
} = require("../services/reportAR.service");

const reportRouter = express.Router();

reportRouter.post("/reports-user", async (req, res) => {
  try {
    const { body } = req;
    const results = await fetchUser(body);
    if (results.status != "success") throw new Error(results.error);
    return res.status(200).json({
      message: results.message,
      data: results.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occured",
      error: error.message,
    });
  }
});

reportRouter.post("/approved", async (req, res) => {
  try {
    const { body } = req;
    const results = await processReportApproved(body);

    console.log(`Data approved => ${results.message}`);

    if (results.statusMsg != "success") {
      console.log(`Error: ${results.error}`);
      throw new Error(results.error); // Explicitly throw an error with a message
    }

    return res.status(200).json({
      message: results.message,
    });
  } catch (error) {
    console.error("Error in /approved endpoint:", error.message);

    return res.status(500).json({
      message: "An error occurred",
      error: error.message || "Unknown error", // Explicitly include error message
    });
  }
});
reportRouter.post("/reject", async (req, res) => {
  try {
    const { body } = req;
    const results = await processReportRejected(body);

    console.log(`Data rejected => ${results.message}`);

    if (results.statusMsg != "success") {
      console.log(`Error: ${results.error}`);
      throw new Error(results.error); // Explicitly throw an error with a message
    }

    return res.status(200).json({
      message: results.message,
    });
  } catch (error) {
    console.error("Error in /rejected endpoint:", error.message);

    return res.status(500).json({
      message: "An error occurred",
      error: error.message || "Unknown error", // Explicitly include error message
    });
  }
});

reportRouter.post("/viewPdf", async (req, res) => {
  try {
    const { body } = req;
    const results = await viewPdf(body);
    if (results.message !== "pdf located") throw new Error(results.error);
    return res.status(200).json({
      message: results.message,
      data: results.data,
    });
  } catch (error) {
    return {
      message: "error occured",
      error: error.message,
    };
  }
});

module.exports = reportRouter;
