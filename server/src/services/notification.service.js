import { sendEmail } from "../utils/sendEmail.js";
import { welcomeEmailTemplate } from "../utils/emailTemplates.js";

export const sendWelcomeEmail = async ({ email, name }) => {
  try {
    await sendEmail({
      email,
      subject: "Welcome to CarRental! 🚗",
      htmlMessage: welcomeEmailTemplate(name),
    });
  } catch (error) {
    console.error("Welcome Email Error:", error.message);
  }
};
