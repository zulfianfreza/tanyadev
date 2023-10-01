import express, { Router } from "express";
import * as AuthController from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);

export default router;
