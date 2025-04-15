const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOTPEmail } = require('../utils/sendEmail');
const otpStore = new Map();


exports.sendOTP = async (req, res) => {
    const { email } = req.body;
   if(!email)
    return res.status(400).json({ message: 'Email is required' });
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`Generated OTP for ${email}: ${otp}`);
        const hashOtp = await bcrypt.hash(otp, 10); // Hash the OTP before storing it
        const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
        otpStore.set(email, { otp: hashOtp, expirationTime });
        // Send OTP email
        await sendOTPEmail(email, otp);
        return res.status(200).json({ message: 'OTP đã được gửi đến bạn' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending OTP' });
    }
}

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }
    try {
        const storedOtpData = otpStore.get(email);
        if (!storedOtpData) {
            return res.status(400).json({ message: 'OTP không hợp lệ hoặc đã hết hạn' });
        }
        const { otp: hashedOtp, expirationTime } = storedOtpData;
        if (Date.now() > expirationTime) {
            otpStore.delete(email); // Remove expired OTP
            return res.status(400).json({ message: 'OTP không hợp lệ hoặc đã hết hạn' });
        }
        const isMatch = await bcrypt.compare(otp, hashedOtp);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mã OTP không đúng' });
        }
        otpStore.delete(email); // Remove OTP after successful verification
        return res.status(200).json({ message: 'Xác thực mã OTP thành công' });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error verifying OTP' });
    }
}


    