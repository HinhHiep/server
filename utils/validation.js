const { isValidPhoneNumber } = require('@hiephinh/share')
const { isValidPassword } = require('@hiephinh/share')

const isValidLogin = (phoneNumber, password) => {
    // Kiểm tra rỗng
    if (!phoneNumber) {
       const err = new Error()
       err.statusCode = 400
       err.message = 'Số điện thoại không được để trống'
       err.name = 'unvalidPhoneNumber'
       throw err
    }
    if (!password) {
       const err = new Error()
       err.statusCode = 400
       err.message = 'Mật khẩu không được để trống'
       err.name = 'unvalidPassword'
       throw err
    }
    // Kiểm tra định dạng số điện thoại và mật khẩu
    if (!isValidPhoneNumber(phoneNumber)) {
       const err = new Error()
       err.statusCode = 400
       err.message = 'Số điện thoại không hợp lệ'
       err.name = 'unvalidPhoneNumber'
       throw err
    }
    if (!isValidPassword(password)) {
       const err = new Error()
       err.statusCode = 400
       err.message = 'Mật khẩu không hợp lệ'
       err.name = 'unvalidPassword'
       throw err
    }
    return true
}

module.exports = {
    isValidLogin,
}