// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Đăng ký người dùng
// router.post('/register', async (req, res) => {
//   const { username, password, fullname, dateOfBirth, email, phoneNumber, gender, address } = req.body;
  
//   try {
//     let user = await User.findOne({ username });
//     if (user) {
//       return res.status(400).json({ msg: 'Username already exists' });
//     }

//     user = new User({
//       username,
//       password,
//       fullname,
//       dateOfBirth,
//       email,
//       phoneNumber,
//       gender,
//       address
//     });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ 
//           msg: 'Hoàn Tất Đăng Ký',
//           token 
//         });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Đăng nhập
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     let user = await User.findOne({ username });

//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({
//           msg: 'Đăng Nhập Thành Công',
//           token,
//           user: {
//             id: user.id,
//             username: user.username,
//             fullname: user.fullname,
//             dateOfBirth: user.dateOfBirth,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             gender: user.gender,
//             address: user.address
//           }
//         });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Đăng ký người dùng
router.post('/register', async (req, res) => {
  const { username, password, fullname, dateOfBirth, email, phoneNumber, gender, address } = req.body;

  try {
    console.log('Đang kiểm tra người dùng tồn tại');
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    console.log('Đang tạo người dùng mới');
    user = new User({
      username,
      password,
      fullname,
      dateOfBirth,
      email,
      phoneNumber,
      gender,
      address
    });

    console.log('Đang băm mật khẩu');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    console.log('Đang lưu người dùng mới');
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    console.log('Đang tạo token JWT');
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          msg: 'Hoàn Tất Đăng Ký',
          token 
        });
      }
    );
  } catch (err) {
    console.error('Lỗi khi đăng ký:', err.message);
    res.status(500).send('Server error');
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Đang kiểm tra người dùng');
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('Đang kiểm tra mật khẩu');
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    console.log('Đang tạo token JWT');
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: 'Đăng Nhập Thành Công',
          token,
          user: {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            address: user.address
          }
        });
      }
    );
  } catch (err) {
    console.error('Lỗi khi đăng nhập:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
