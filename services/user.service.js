const { where } = require("sequelize");
const { hashPassword, signToken } = require("../helpers/user.utils");
const { sequelize, Users } = require("../models");
const { compare } = require("bcrypt");

const createAccount = async ({
  fname,
  mname,
  lname,
  section,
  yearlvl,
  password,
  email,
  role
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
      email,
      role
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
      },
      "9h"
    );

    await Users.update({
      token: createToken,
    },{
      where:{
        email:userEmail.email
      }
    });
    return {
      message: "Success login",
      data: {
        id:userEmail.id,
        fname:userEmail.fname,
        mname:userEmail.mname,
        lname:userEmail.lname,
        section:userEmail.section,
        yearlvl:userEmail.yearlvl,
        email:userEmail.email,
        token:createToken,
        role:userEmail.role
      }
    };
  } catch (error) {
    return {
      message:error.message
    }
  }
};
const fetchAccounts = async () => {
  try {
    const result = await Users.findAll({
      attributes: { exclude: ["password","createdAt","updatedAt","token"] },
    })
  if(result.length==0){
    return {
      message:"success fetch",
      data:"empty"
    }
  }
  return {
    message:"success fetch",
    data:result
  }
    
  } catch (error) {
    return {
      message:"error occurred",
      error:error.message
    }
  }
  
}

module.exports = {
  createAccount,
  login,
  fetchAccounts
};
