import userModel from "../models/User.js";
import bcrypt from "bcrypt";

//Update Controller
export const updateController = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("wrong credentials");
  }
};
//Delete Controller
export const deleteController = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted Successfully!");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
};

//Get Controller
export const getController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
