const nodemailer = require("nodemailer");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "colab.undefined@gmail.com",
    pass: "zhoz zdaz amsl stns",
  },
});

const sendEmail = async (to, purpose, data) => {
  const otp = generateOTP();
  let mailOptions = {}; // Use `let` instead of `const` for reassignment

  if (purpose === "register") {
    console.log("Sending OTP for registration");
    mailOptions = {
      from: "colab.undefined@gmail.com",
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
  } else if (purpose === "addMember") {
    console.log("Sending email to add member");
    const { owner, member, role } = data;

    mailOptions = {
      from: "colab.undefined@gmail.com",
      to,
      subject: `Welcome to the project, ${member}!`,
      text: `
          Hello ${member},
  
          Congratulations! You have been added to a project on Co-Lab.
  
          Project Owner: *${owner}* 
          Assigned Role: ${role}
  
          You are now a valued member of the team. Please log in to your Co-Lab account to view the project details and your responsibilities.
  
          If you have any questions or need assistance, feel free to reach out to ${owner} or contact our support team.

          Welcome aboard, and we look forward to seeing your contributions!

          Best regards,  
          The Co-Lab Team
  
          ---
  
          For any questions or support, feel free to contact us at [support@colab.com](mailto:support@colab.com).
      `,
    };
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    // Return a response object with a success message and the generated OTP if applicable
    return {
      message: "Email sent successfully",
      ...(purpose === "register" && { otp }), // Include OTP only for registration purpose
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
