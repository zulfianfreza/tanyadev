import express, { Router } from "express";
import * as SkillController from "../controllers/skill.controller";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/", SkillController.index);
router.get("/:techSlug", SkillController.getSkillByTechSlug);
router.post("/add-skill", isAuthenticated, SkillController.store);
router.delete(
  "/delete-skill/:skillId",
  isAuthenticated,
  SkillController.destroy
);
router.patch("/update-skill/:skillId", isAuthenticated, SkillController.update);

export default router;
