import express from "express"
import { login, logout, signin, signup } from "../controllers/auth.controllers.js";

const router = express.Router()

router.post("/login",login)
router.post("/logout",logout)
router.post("/signin",signin)
router.post("/signup",signup)

export default router;