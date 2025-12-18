import express from "express";
import { addServiceJobController, changeUserRoleController, deleteCarController, deleteServiceJobController, deleteUserController, getAppointemetCarsController, getAppointmentsController, getDashboardController, getMechanicsController, getServiceJobsController, getUsersContorller, getVehiclesController, updateSeriveStatusController, updateServiceMechanicsController } from "../controllers/admin.controller.js";


const router=express.Router();
router.get("/getServiceJobs", getServiceJobsController);
router.get("/dashboard", getDashboardController);
router.get("/getMechanics", getMechanicsController);
router.get("/getAppointments", getAppointmentsController);
router.get("/getVehicles", getVehiclesController);
router.get("/getUsers", getUsersContorller);
router.get("/appointemenCars",getAppointemetCarsController);
router.put("/changeUserRole/:userId",changeUserRoleController);
router.put("/updateServiceMechanics",updateServiceMechanicsController);
router.put("/updateServiceStatus/:serviceJobId",updateSeriveStatusController);
router.post("/addServiceJob",addServiceJobController);
router.delete("/deleteServiceJob/:serviceJobId",deleteServiceJobController);
router.delete("/deleteCar/:id",deleteCarController);
router.delete("/deleteUser/:userId",deleteUserController);

export default router;