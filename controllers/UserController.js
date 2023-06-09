import userModel from "../models/User.js";
import bcrypt from "bcrypt";

//Update Controller
export const updateController = async (req, res) => {
  const { id } = req.params;
  const { email, phone, aboutMe, cipherMap, professionalInfo, interests } =
    req.body;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the email or phone number matches the user's credentials
    if (email === user.email || phone === user.phone) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        {
          $set: {
            email,
            phone,
            password: req.body.password,
            aboutMe,
            cipherMap,
            professionalInfo,
            interests,
          },
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

//follow a user
export const followController = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      const currentuser = await userModel.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentuser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed!");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cant follow yourself");
  }
};
//Unfollow a user
export const unfollowController = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      const currentuser = await userModel.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentuser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed!");
      } else {
        res.status(403).json("you dont't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cant unfollow yourself");
  }
};
