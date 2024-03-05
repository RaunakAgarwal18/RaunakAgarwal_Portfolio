import express from 'express';
import json from 'body-parser';
import { createTransport } from 'nodemailer';

const app = express();
const port = 5501;

// Middleware to parse JSON body
app.use(json);

// Route for handling form submission and sending email
app.post('/send-email', (req, res) => {
    const { fullName, email, mobileNumber, subject, message } = req.body;

    // Create transporter
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'raunak180803@gmail.com',
            pass: 'svbktyrltbztgtie'
        }
    });

    // Email options
    const mailOptions = {
        from: '"Raunak Agarwal" <raunak180803@gmail.com>',
        to: email,
        subject: subject,
        text: `Name: ${fullName}\nEmail: ${email}\nMobile Number: ${mobileNumber}\nMessage: ${message}\nWe will get back to you shortly`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});