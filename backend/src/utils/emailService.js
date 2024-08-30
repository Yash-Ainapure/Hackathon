const nodemailer = require("nodemailer");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sergiomarquina004@gmail.com",
    pass: "yqwx ewtq gjjo tpxq",
  },
});

const sendEmail = async (to) => {
  const otp = generateOTP();

  const mailOptions = {
    from: "sergiomarquina004@gmail.com",
    to,
    subject: "OTP Verification for Co-Lab!",
    text: `
        Hello,

        Thank you for choosing Co-Lab!

        Here is your One-Time Password (OTP) for verification:

        **${otp}**

        Please enter this OTP to verify your email address and complete your registration. If you did not request this OTP, please ignore this email.

        Best regards,  
        The Co-Lab Team

        ---

        For any questions or support, feel free to contact us at [support@colab.com](mailto:support@colab.com).
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    // Return a response object with a success message and the generated OTP
    return {
      message: "OTP sent successfully",
      otp: otp,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
