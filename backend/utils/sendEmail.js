const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // 587 port-ku false thaan irukkanum
    auth: {
        user: 'aagamavedham@gmail.com', // Un official mail id
        pass: process.env.BREVO_SMTP_PASS, // .env la vacha key
    },
});

const sendEmail = async (to, subject, htmlContent) => {
    try {
        await transporter.sendMail({
            from: '"Aagama Vedham" <aagamavedham@gmail.com>',
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