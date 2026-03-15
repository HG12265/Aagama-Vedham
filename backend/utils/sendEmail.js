const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, 
    auth: {
        // INGA THAAN MATHI IRUKKEN 👇
        user: 'a4f7a3001@smtp-brevo.com', 
        pass: process.env.BREVO_SMTP_PASS, 
    },
});

const sendEmail = async (to, subject, htmlContent) => {
    try {
        await transporter.sendMail({
            from: '"Aagama Vedham" <aagamavedham@gmail.com>', // Idhu un Gmail aagave irukkatum
            to: to,
            subject: subject,
            html: htmlContent,
        });
        console.log(`Email sent successfully to: ${to} 📧`);
    } catch (error) {
        console.error("Email sending failed ❌:", error);
    }
};

module.exports = sendEmail;