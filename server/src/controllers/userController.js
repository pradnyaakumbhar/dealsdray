import User from '../modals/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //find user
    const user = await User.findOne({ f_userName: username });
    if (!user) {
      //hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      //create new user
      const newUser = new User({
        f_userName: username,
        f_pwd: hashedPassword,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ message: ' New user created successfully' });
    }

    //check password
    const isPasswordValid = bcrypt.compareSync(password, user.f_pwd);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    //create token
    const token = jwt.sign({ username: user.f_name }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};
