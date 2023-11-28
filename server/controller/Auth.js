import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import { validationResult } from 'express-validator';
  
//SLY-6
const registerUser = async (req, res) => {
    //SLY-12
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, password } = req.body;
  
    try {

      let user = await user.findOne({ email });
  
      if (user) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
  
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      //SLY-13
      user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();
       // SLY-14
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '48h',
      });
      //SLY-15
      //SLY-24
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error registering user' });
    }
  };

  //SLY-1
  const loginUser = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid Email or password' });
      }
  
      // Compare the provided password with the stored hash
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid Email or password' });
      }
      // SLY-11
      // Create a JSON Web Token (JWT)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '48h',
      });
      //SLY-23
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error logging in' });
    }
  };
  

export {registerUser, loginUser,};
