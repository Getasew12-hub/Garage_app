import express from "express";
import {  protectRoute } from "../middleware/protecedRouter.js";
import { getMechanicServiceJobsController, updateServiceJobController } from "../controllers/servicejob.controller.js";

const router=express.Router();


router.get("/getMechanicServiceJobs",protectRoute, getMechanicServiceJobsController);


router.put("/updateServiceJob/:serviceJobId",protectRoute,updateServiceJobController);


export default router;