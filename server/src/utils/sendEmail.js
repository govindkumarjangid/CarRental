import { Resend } from 'resend';
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    try {
        const data = await resend.emails.send({
            from: 'CarRental <onboarding@resend.dev>',
            to: [options.email],
            subject: options.subject,
            html: options.htmlMessage,
        });
        // console.log("Email sent successfully", data.id);
        return data;
    } catch (error) {
        console.error('Error sending email via Resend:', error);
        throw new Error('Error sending email via Resend');
    }
}

export default sendEmail;