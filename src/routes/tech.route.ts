import express, { Router } from "express";
import * as TechController from "../controllers/tech.controller";
import upload from "../utils/multer";

const router: Router = express.Router();

router.get("/", TechController.index);
router.post("/", upload.single("image"), TechController.store);
router.get("/:techId", TechController.find);
router.put("/:techId", TechController.update);
router.delete("/:techId", TechController.destroy);

export default router;
