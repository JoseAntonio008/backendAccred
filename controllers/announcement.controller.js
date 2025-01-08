const express = require("express");

const {
  fetchAnnouncement,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  adminAnnouncement,
} = require("../services/announcement.service");
const announceRouter = express.Router();

announceRouter.get("/get-announcement", async (req, res) => {
  try {
    const { body } = req;
    const result = await fetchAnnouncement(body);
    if (result.message == "error occured") throw new Error(result.error);
    return res.status(200).json({
      message: "success fetch",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occurred",
      error: error.message,
    });
  }
});
announceRouter.get("/get-announcementAdmin", async (req, res) => {
  try {
    const result = await adminAnnouncement();
    if (result.message == "error occured") throw new Error(result.error);
    return res.status(200).json({
      message: "success fetch",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occurred",
      error: error.message,
    });
  }
});
announceRouter.post("/create-announcement", async (req, res) => {
  try {
    const { body } = req;
    const result = await createAnnouncement(body);
    if (result.message == "error occurred") throw new Error(result.error);
    return res.status(200).json({
      message: "created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occured",
      error: error.message,
    });
  }
});

announceRouter.delete("/delete-announcement", async (req, res) => {
  try {
    const { body } = req;
    const result = await deleteAnnouncement(body);
    if (result.message == "error occurred") throw new Error(result.error);
    return res.status(200).json({
      message: "deleted successfully",
      //   data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occurred",
      error: error.message,
    });
  }
});

announceRouter.post("/update-announcement", async (req, res) => {
  try {
    const { body } = req;
    const result = await updateAnnouncement(body);
    if (result.message == "error occured") throw new Error(result.error);
    return res.status(200).json({
      message: "update success",
      data: body,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occured",
      error: error.message,
    });
  }
});
module.exports = announceRouter;
