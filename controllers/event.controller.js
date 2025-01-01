const express = require("express");
const { addEvent, fetchEvents, removeEvent, updateEvent } = require("../services/event.service");
const eventRouter = express.Router();

eventRouter.post("/addEvent", async (req, res) => {
  const { body } = req;
  try {
    const event = await addEvent(body);
    if (event.message != "no conflict") throw new Error(event.error);
    return res.status(200).json({
      message: event.message,
      date: event.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occured",
      error: error.message,
    });
  }
});
eventRouter.post("/listEvent", async (req, res) => {
  const { body } = req;
  try {
    const event = await fetchEvents(body);
    if (event.message == "error occured") throw new Error(event.error);
    return res.status(200).json({
      message: event.message,
      data: event.data,
    });
  } catch (error) {
    return res.status(500).json({
        message:"error occured",
        error:error.message
    })
  }
});
eventRouter.delete("/removeEvent",async (req,res) => {
  try {
    const {body} = req
 
    
    const event = await removeEvent(body);
    if(event.message =="error occured")throw new Error(event.error);
    return res.status(200).json({
      message:event.message
    })
    
  } catch (error) {
    return res.status(500).json({
      message:"error occured",
      error:error.message
    })
  }
})
eventRouter.put('/updateEvent',async (req,res) => {
  try {
    const {body} =req
    const event = await updateEvent(body)
    if(event.message == "error occured") throw new Error(event.error);
    return res.status(200).json({
      message:event.message,
      data:event.data
    })
  } catch (error) {
    return res.status(500).json({
      message:"error occured",
      error:error.message
    })
  }
})
module.exports = {
  eventRouter,
};
