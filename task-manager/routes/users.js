import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = Router();

// @route POST api/users/register
// @desc Register a new user
// @access Public
router.post("/register", registerUser);

// @route POST api/users/login
// @desc Login a user / Returning JWT Token
// @access Public
router.post("/login", loginUser);

export default router;
