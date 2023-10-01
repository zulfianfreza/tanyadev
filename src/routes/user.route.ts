import express, { Router } from "express";
import * as UserController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/profile", isAuthenticated, UserController.getProfile);
router.get("/all", UserController.getAllUsers);
router.get("/expert", UserController.getAllExperts);
router.get("/:gitaId", UserController.getUserByGitaId);

export default router;
