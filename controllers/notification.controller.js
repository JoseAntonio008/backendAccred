const express = require("express");
const {
  fetchNotifications,
  deleteNotif,
  updateNotif,
  createNotif,
} = require("../services/notify.service");
const notifRouter = express.Router();

notifRouter.get("/fetch", async (req, res) => {
  try {
    const { body } = req;
    const results = await fetchNotifications(body);
    if (results.message == "error occured") throw new Error(results.error);
    return res.status(200).json({
      message: "success",
      data: results.data,
    });
  } catch (error) {
    return res.status(200).json({
      message: "error occurred",
      error: error.message,
    });
  }
});
notifRouter.delete("/delete-notif", async (req, res) => {
  try {
    const { body } = req;
    const result = await deleteNotif(body);
    if (result.message != "notif successfully deleted")
      throw new Error(result.error);
    return res.status(200).json({
      message: "deleted Successfully",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occurred",
      error: error.message,
    });
  }
});

notifRouter.post("/update-notif", async (req, res) => {
  try {
    const { body } = req;
    const result = await updateNotif(body);
    if (result.message == "error occurred") throw new Error(result.error);
    return res.status(200).json({
      message: "success update",
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occured",
      error: error.message,
    });
  }
});

notifRouter.post("/create-notif", async (req, res) => {
  try {
    const { body } = req;
    const result = await createNotif(body);
    if (result.message == "error occurred") throw new Error(result.error);
    return res.status(200).json({
      message: "successfully created notification",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occured",
      error: error.message,
    });
  }
});

module.exports = notifRouter;
