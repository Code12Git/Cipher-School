import userModel from "../models/User.js";
import bcrypt from "bcrypt";
//Register a User

export const RegisterController = async (req, res) => {
  const { firstName, lastName, Phone, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  try {
    const newUser = new userModel({
      firstName,
      lastName,
      Phone,
      email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Login a User
export const LoginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json("Invalid Credentials");
    } else {
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        res.status(401).json("Oops Wrong Credentials!");
      } else {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
