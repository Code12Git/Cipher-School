import express from "express";
import {
  deleteController,
  getController,
  updateController,
} from "../controllers/UserController.js";

const router = express.Router();

//Update
router.put("/:id", updateController);
//delete
router.delete("/:id", deleteController);
//Get
router.get("/:id", getController);
export default router;
