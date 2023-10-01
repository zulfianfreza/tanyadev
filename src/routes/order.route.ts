import express, { Router } from "express";
import * as OrderController from "../controllers/order.controller";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/", isAuthenticated, OrderController.index);
router.post("/", isAuthenticated, OrderController.store);

export default router;
