const User = require('../models/User');
const generateToken = require('../config/jwt');
const bcrypt = require('bcrypt');

exports.register = async(req,res) => {
  try
  {
    const{username,email,password,role} = req.body;
    const user = new User({username,email,password,role});

    await user.save();
    res.status(201).json({message: 'User registered successfully!'});
  }
  catch(err)
  {
    res.status(201).json({message:'Server error', error:err.message});
  }
};

exports.login = async(req,res) => {
  try
  {
    const{email,password} = req.body;
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password, user.password)))
    {
      return res.status(400).json({message: 'Invalid credentials'});
    }
    const token = generateToken(user);
    res.status(200).json({token});
    console.log("Token is : ",token);
  }
  catch(err)
  {
    res.status(201).json({message:'Server error', error:err.message});
  }
}