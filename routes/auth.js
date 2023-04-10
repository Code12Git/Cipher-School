import express from "express";
import {
  LoginController,
  RegisterController,
} from "../controllers/AuthController.js";

const router = express.Router();

//REGISTER

router.post("/register", RegisterController);
router.post("/login", LoginController);

export default router;
