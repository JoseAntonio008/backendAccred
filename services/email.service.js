require('dotenv').config();

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { Users } = require("../models");

const username = process.env.EMAIL_USERNAME;
const pass = process.env.APP_PASSWORD;


var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: username,
    pass: pass,
  },
});

function generateOTP() {
  // Generate a random number between 100000 and 999999
  return Math.floor(100000 + Math.random() * 900000).toString();
}
const generatedOTP = generateOTP();

const handlebarOptions = {
  viewEngine: {
    extname: ".hbs", // Handlebars file extension
    partialsDir: path.resolve(__dirname, "../templates/"), // Path to partials
    defaultLayout: false, // Disable layout templates
  },
  viewPath: path.resolve(__dirname, "../templates/"), // Correct the path to templates folder
  extName: ".hbs", // File extension for templates
};

transporter.use("compile", hbs(handlebarOptions));

const sendEmail = async (email) => {
  // Check if email is valid before proceeding
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email address");
  }

  // Query the user based on the email
  const user = await Users.findOne({
    where: { email: email }, // Ensure this is properly structured
  });

  if (!user) throw new Error("No user found");

  if (!generatedOTP || typeof generatedOTP !== "string") {
    throw new Error("Invalid OTP generated");
  }
  console.log("OTP here:");
  
  console.log(generatedOTP);
  

  // Update the OTP code in the database
  const updateOTP = await Users.update(
    {
      code: generatedOTP,
    },
    {
      where: { email: email },
    }
  );

  const mailOptions = {
    from: "capssysvote@gmail.com",
    to: user.email,
    subject: "OTP-CODE forgot password",
    template: "otp",
    context: {
      name: user.lname,
      otp: generatedOTP,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { message: "otpSent", data: info };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      message: error.message,
      error: error,
    };
  }
};

module.exports = {
  sendEmail,
};
