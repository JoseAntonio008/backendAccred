require("dotenv").config();

const { format, isBefore, isAfter, parseISO } = require("date-fns");

const SECRET_KEY = process.env.SECRET_KEY;
const salt = parseInt(process.env.SALTROUNDS);
const { hash, compare } = require("bcrypt");
const nodemon = require("nodemon");
const { sign, verify } = require("jsonwebtoken");

const hashPassword = (password) => hash(password, salt || 10);
const comparePass = (password, hashPassword) => compare(password, hashPassword);

const signToken = (payload, expire) =>
  sign(payload, SECRET_KEY, { expiresIn: expire ?? 60 * 60 * 9 }).toString();
const verifyToken = (token, SECRET_KEY) => verify(token, SECRET_KEY);



// Function to Check Overlap
const checkDate = (start, end, venue, startReq, endReq, venueReq) => {
  return (
    isBefore(startReq, end) && // Requested start is before the end of the existing event
    isBefore(start, endReq) && // Existing start is before the requested end
    venue === venueReq // Same venue
  );
};



module.exports = {
  hashPassword,
  comparePass,
  signToken,
  verifyToken,
  checkDate,
};
