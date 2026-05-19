import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect, { requireOwner } from "../middleware/authMiddleware.js";
import {
    createHospitality,
    getHospitalities,
    getOwnerHospitalities,
    toggleHospitalityAvailability,
} from "../controllers/hospitalityController.js";

const hospitalityRouter = express.Router();

hospitalityRouter.post("/", upload.single("image"), protect, requireOwner, createHospitality);
hospitalityRouter.get("/", getHospitalities);
hospitalityRouter.get("/owner", protect, requireOwner, getOwnerHospitalities);
hospitalityRouter.post("/toggle-availability", protect, requireOwner, toggleHospitalityAvailability);

export default hospitalityRouter;
