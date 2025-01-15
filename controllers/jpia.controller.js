const express = require("express");
const {
  fetchUser,
  processReportApproved,
  processReportRejected,
  viewPdf,
  fetchAdmin,
  frChartsCTHM,
  frChartsCCST,
  frChartsCTED,
  frChartsCAS,
  frChartsCHK,
  frChartsCOE,
  frChartsCOA,
  frChartsCNHS,
} = require('../services/jpiafr.service');

const jpiaRouter = express.Router();

jpiaRouter.post("/reports-user", async (req, res) => {
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
jpiaRouter.get("/adminFR", async (req, res) => {
  try {
    const result = await fetchAdmin();
    if (result.message == "error occured") throw new Error(result.error);
    return res.status(200).json({
      message: "Financial Report for admin",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occurred",
      error: error.message,
    });
  }
});

jpiaRouter.post("/approved", async (req, res) => {
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
jpiaRouter.post("/reject", async (req, res) => {
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

jpiaRouter.post("/viewPdf", async (req, res) => {
  try {
    const { body } = req;
    const results = await viewPdf(body);
    if (results.message !== "pdf located") throw new Error(results.error);
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
jpiaRouter.get("/chart-fr",async (req,res) => {
  try {
    const cthm = await frChartsCTHM();
    const ccst = await frChartsCCST()
    const cted = await frChartsCTED();
    const cas = await frChartsCAS();
    const chk = await frChartsCHK();
    const coe = await frChartsCOE();
    const coa = await frChartsCOA();
    const cnhs = await frChartsCNHS()
    
    return res.status(200).json({
      message:"AR reports",
      data:[cthm.data,ccst.data,cted.data,cas.data,chk.data,coe.data,coa.data,cnhs.data]
    })
  } catch (error) {
    return res.status(500).json({
      message:"an error occurred",
      error:error.message
    })
  }
})

module.exports = jpiaRouter;
