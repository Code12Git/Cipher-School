import express from "express";
import {
  deleteController,
  getController,
  updateController,
  followController,
  unfollowController,
} from "../controllers/UserController.js";

const router = express.Router();

//Update
router.put("/:id", updateController);
//delete
router.delete("/:id", deleteController);
//Get
router.get("/:id", getController);
//Follow
router.put("/:id/follow", followController);
//Unfollow
router.put("/:id/unfollow", unfollowController);

export default router;
