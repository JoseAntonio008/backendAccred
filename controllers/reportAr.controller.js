const express = require("express");
const { fetchUser } = require("../services/reportAR.service");

const reportRouter = express.Router();

reportRouter.post('/reports-user',async (req,res) => {
  try {
    const { body } = req;
    const results = await fetchUser(body)
    if(results.status != "success") throw new Error(results.error);
    return res.status(200).json({
      message:results.message,
      data:results.data
    })
  } catch (error) {
   return res.status(500).json({
    message:"error occured",
    error:error.message
   }) 
  }
})

module.exports = reportRouter;
