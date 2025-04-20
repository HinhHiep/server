const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {isValidLogin} = require('@hiephinh/share')

exports.fetchAllUsers = async (req, res) => {
    try {
      const users = await User.find();  // Truy vấn tất cả người dùng
      return res.status(200).json(users);  // Trả về danh sách người dùng
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Lỗi khi lấy dữ liệu người dùng');
    }
  };

exports.isExitUser = async (req, res) => {
  const { phoneNumber } = req.body;
  const user = await User.find({ phoneNumber });
  if(user.length > 0) {
    return res.status(400).json({ message: 'Người dùng đã tồn tại' });
  }
  return res.status(200).json({ message: 'Người dùng chưa tồn tại' });
}

exports.register = async (req, res) => {
  try {
    const {name, gender, birth, email, phoneNumber, password} = req.body;
    // Kiểm tra xem người dùng đã tồn tại chưa
    const  exitUser = await User.findOne({ phoneNumber });

    if (exitUser) {
      return res.status(400).json({ message: 'Người dùng đã tồn tại' });
    }
    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Tạo người dùng mới
    const newUser = new User ({
      name,
      gender,
      birth,
      email,
      phoneNumber,
      password: hashedPassword,
      avatar: 'https://example.com/default-avatar.png',
      bannerImage: 'https://example.com/default-banner.png',
      status: 'Online',
      createDate: new Date(),
      modifyDate: new Date(),
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();
    // Tạo token cho người dùng
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    // Trả về thông tin người dùng và token
    return res.status(201).json({
      message: 'Đăng ký thành công',
      user:{
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        avatar: newUser.avatar,
        bannerImage: newUser.bannerImage,
        status: newUser.status,
      },
      token,
    });

    
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi đăng ký người dùng');
    
  }
}

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    // Kiểm tra định dạng số điện thoại và mật khẩu
   if(isValidLogin(phoneNumber, password)) {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ phoneNumber });
    if (user === null) {
      return res.status(400).json({ message: 'Người dùng không tồn tại' });
    }
    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }
    // Tạo token cho người dùng
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    // Trả về thông tin người dùng và token
    return res.status(200).json({
      message: 'Đăng nhập thành công',
      user:{
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
        bannerImage: user.bannerImage,
        status: user.status,
      },
      token,
    });
    }
  } catch (error) {
    const errName = error.name || 'Error';
    const errMessage = error.message || 'Lỗi khi đăng nhập người dùng';
    const errStatusCode = error.statusCode || 500;
    return res.status(errStatusCode).json({
      name: errName,
      message: errMessage,
    });
  }
}