const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sergiomarquina004@gmail.com",
    pass: "yqwx ewtq gjjo tpxq",
  },
});

const sendEmail = async (to) => {

  const mailOptions = {
    from: "sergiomarquina004@gmail.com",
    to,
    subject: "Congratulations! You have been selected as a project member!",
    text: `
        Hello,

        Congratulations!

        We are thrilled to inform you that you have been selected as a member of our project team on Co-Lab!

        We believe your skills and expertise will be a great addition to our project, and we are excited to have you on board.

        We look forward to collaborating with you and achieving great things together!

        Best regards,
        The Co-Lab Team

        ---

        For any questions or support, feel free to contact us at [support@colab.com](mailto:support@colab.com).
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully");

    return {
      message: "Mail sent successfully",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
