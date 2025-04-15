const { Op, where } = require("sequelize");
const {
  hashPassword,
  signToken,
  verifyToken,
} = require("../helpers/user.utils");
const { sequelize, Users } = require("../models");
const { compare } = require("bcrypt");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const createAccount = async ({
  fname,
  mname,
  lname,
  section,
  yearlvl,
  password,
  email,
  department,
  role,
  // token,
}) => {
  try {
    const checkExist = await Users.findOne({
      where: {
        email,
      },
    });

    if (checkExist) throw new Error("account Already Exist");
    const hashedPass = await hashPassword(password);
    const createAccount = await Users.create({
      fname,
      mname,
      lname,
      section,
      yearlvl,
      password: hashedPass,
      department,
      email,
      role,
      // token,
    });

    return {
      message: "Created Successfully",
      data: `created Account for ${createAccount?.lname} `,
      //
    };
  } catch (error) {
    return {
      message: "error creating the Account",
      error: error,
    };
  }
};

const login = async ({ email, password }) => {
  try {
    const userEmail = await Users.findOne({
      where: {
        email,
      },
    });
    if (!userEmail) throw new Error("Incorrect Email");
    const checkPass = await compare(password, userEmail.password);
    if (!checkPass) throw new Error("Incorrect Password");

    const createToken = await signToken(
      {
        userId: userEmail.id,
        userName: `${userEmail.lname}, ${userEmail.fname}`,
        role: userEmail.role,
        department: userEmail.department,
      },
      "9h"
    );

    await Users.update(
      {
        token: createToken,
      },
      {
        where: {
          email: userEmail.email,
        },
      }
    );
    return {
      message: "Success login",
      data: {
        id: userEmail.id,
        fname: userEmail.fname,
        mname: userEmail.mname,
        lname: userEmail.lname,
        section: userEmail.section,
        yearlvl: userEmail.yearlvl,
        email: userEmail.email,
        token: createToken,
        role: userEmail.role,
        department: userEmail.department,
      },
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
const fetchAccounts = async () => {
  try {
    const result = await Users.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt", "token"] },
      where: {
        role: {
          [Op.ne]: "admin", // Op.ne = "not equal" in Sequelize
        },
      },
    });

    if (result.length === 0) {
      return {
        message: "success fetch",
        data: "empty",
      };
    }

    return {
      message: "success fetch",
      data: result,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};

const udpateAccount = async ({
  id,
  fname,
  mname,
  lname,
  section,
  yearlvl,
  email,
  department,
}) => {
  try {
    const checkExist = await Users.findByPk(id);
    if (!checkExist) throw new Error("no id found");

    const toUpdate = await Users.update(
      {
        fname,
        mname,
        lname,
        section,
        yearlvl,
        email,
        department,
      },
      {
        where: {
          id: checkExist.id,
        },
      }
    );
    return {
      message: "updated Account Successfully",
    };
  } catch (error) {
    return {
      message: "an Error occurred",
      error: error.message,
    };
  }
};
const deleteAccount = async ({ id }) => {
  try {
    const checkExist = await Users.findByPk(id);
    if (!checkExist) throw new Error("no id found");
    const toDelete = await Users.destroy({
      where: {
        id: checkExist.id,
      },
    });
    return {
      message: "deleted successfully",
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const checkTokenAdmin = async ({ token }) => {
  try {
    const decoded = verifyToken(token, SECRET_KEY);
    if (!decoded) throw new Error("invalid Token");

    const checkToken = await Users.findByPk(decoded.userId);
    if (!checkToken) throw new Error("no user found with this id");
    // if(decoded.role != "admin") throw new Error("credential does not match");

    return {
      message: "valid token",
      role: decoded.role,
      department: decoded.department,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const checkOtp = async ({ code, email }) => {
  try {
    const checkEmail = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!checkEmail) throw new Error("email not found");
    if (checkEmail.code != code) {
      throw new Error("OTP does not match");
    }
    return {
      message: "code matches",
    };
  } catch (error) {
    return {
      message: "an error occurred",
      error: error.message,
    };
  }
};
const changePassword = async ({ email, password, code }) => {
  try {
    const checkExist = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!checkExist) throw new Error("no email found");
    if (checkExist.code != code) throw new Error("Otp does not match");

    hashedPass = await hashPassword(password);
    const updatePass = await Users.update(
      {
        password: hashedPass,
        code: " ",
      },
      {
        where: {
          email: email,
        },
      }
    );
    return {
      message: "password changed successfully",
    };
  } catch (error) {
    return {
      message: "an Error occurred",
      error: error.message,
    };
  }
};
module.exports = {
  createAccount,
  login,
  fetchAccounts,
  udpateAccount,
  deleteAccount,
  checkTokenAdmin,
  checkOtp,
  changePassword,
};
