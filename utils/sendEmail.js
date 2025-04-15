const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });

exports.sendOTPEmail = async (email, otp) => {
    if (!email || !otp) {
        throw new Error('Email and OTP are required');
    }
    // Tạo nội dung email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Mã xác thức OTP Echo Chat',
        html: `<h1>Mã xác thực OTP</h1><p>Xin chào,</p><p>Mã xác thực OTP của bạn là: <strong>${otp}</strong></p><p>Vui lòng không chia sẻ mã này với bất kỳ ai khác.</p>`,
        text: `Mã xác thực OTP của bạn là: ${otp}`,
    };

    try {
        console.log('Sending email from ', process.env.EMAIL_USER, 'to', email);
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        // await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

