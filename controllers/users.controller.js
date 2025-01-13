const {
  createAccount,
  login,
  fetchAccounts,
  udpateAccount,
  deleteAccount,
} = require("../services/user.service");
const express = require("express");
const userRoute = express.Router();

userRoute.post("/signUp", async (req, res) => {
  const { body } = req;
  try {
    const signUp = await createAccount(body);
    if (signUp.message != "Created Successfully") throw new Error(signUp.error);
    return res.status(200).json({
      message: "success creating the account",
      data: signUp.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occured creating the account",
      error: error.message,
    });
  }
});
userRoute.post("/login", async (req, res) => {
  const { body } = req;
  try {
    const signIn = await login(body);
    if (signIn.message != "Success login") throw new Error(signIn.message);
    return res.status(200).json({
      message: "Success Login",
      data: signIn.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
userRoute.get("/fetchAccounts", async (req, res) => {
  try {
    const result = await fetchAccounts();
    if (result.message == "error occurred") throw new Error(result.error);
    return res.status(200).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occurred",
      error: error.message,
    });
  }
});
userRoute.post("/updateAccount", async (req, res) => {
  try {
    const { body } = req;
    const result = await udpateAccount(body);
    if (result.message == "an Error occurred") throw new Error(result.error);
    return res.status(200).json({
      message: "Account updated Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "an Error occurred",
      error: error.message,
    });
  }
});
userRoute.delete("/delete-account", async (req, res) => {
  try {
    const { body } = req;
    const result = await deleteAccount(body);
    if (result.message == "error occurred") throw new Error(result.error);
    return res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error occurred",
      error: error.message,
    });
  }
});
module.exports = {
  userRoute,
};
