const express = require('express');
const router = express.Router();
const { fetchAllUsers,
    login,
    register,
 } = require('../controllers/user.controller');

 const { sendOTP, verifyOTP } = require('../controllers/user.authController');

/* 
    * @route GET /users
    * @desc Fetch all users
    * @access Public
    * @returns {Array} List of users
    * @throws {Error} If an error occurs while fetching users :
    * - 500 Lỗi khi lấy dữ liệu người dùng
    
    */
/*
*/
router.get('/users', fetchAllUsers);
/* 
    * @route POST /login
    * @param {string} phoneNumber - User's phone number
    * @param {string} password - User's password
    * @returns {Object} Login response with token and user info
    * @throws {Error} If an error occurs during login 
    *   - 400 Người dùng không tồn tại
    *  - 400 Mật khẩu không đúng
    * - 500 Lỗi khi đăng nhập người dùng
    * 
    */

router.post('/login', login);

/*
    * @route POST /register
    * @param {string} name - User's name
    * @param {string} gender - User' gender
    * @param {Date} birth - User's birth date
    * @param {string} email - User's email
    * @param {string} phoneNumber - User's phone number
    * @param {string} password - User's password
    * @returns {Object} Registration response with token and user info
    * @throws {Error} If an error occurs during registration 
    *   - 400 Người dùng đã tồn tại
    *  - 500 Lỗi khi đăng ký người dùng
    * - 500 Lỗi khi mã hóa mật khẩu
    * - 500 Lỗi khi lưu người dùng vào cơ sở dữ liệu
    * 
    */
router.post('/register', register);

/*
    * @route POST /send-otp
    * @param {string} email - User's email
    * @returns {Object} OTP sending response
    * @throws {Error} If an error occurs during OTP sending 
    *   - 400 Email is required
    *  - 500 Lỗi khi gửi mã OTP
    * 
    */
router.post('/send-otp', sendOTP);

/*
    * @route POST /verify-otp
    * @param {string} email - User's email
    * @param {string} otp - User's OTP
    * @returns {Object} OTP verification response
    * @throws {Error} If an error occurs during OTP verification 
    *   - 400 Email and OTP are required
    *  - 400 OTP không hợp lệ hoặc đã hết hạn
    *  - 400 Mã OTP không đúng
    *  - 500 Lỗi khi xác thực mã OTP
    * 
    */
router.post('/verify-otp', verifyOTP);
module.exports = router;