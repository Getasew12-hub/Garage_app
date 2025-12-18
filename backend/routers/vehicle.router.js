import express from 'express';
import { addVehicleController, deleteVehicleController, getUservehiclesController, updateVehicleController } from '../controllers/vhecles.controller.js';


const router= express.Router();

router.get("/getUservehicles",getUservehiclesController);
router.post("/addVehicle",addVehicleController);
router.put("/updateVehicle/:vehicleId",updateVehicleController);
router.delete("/deleteVehicle/:vehicleId",deleteVehicleController);


export default router;