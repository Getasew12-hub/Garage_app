import express from "express";
import { addAppointmentController, deleteAppointmentController, getUserAppointmentsController, suggestAppointmentController, updateAppointmentController } from "../controllers/appointment.controller.js";

const router=express.Router();

 router.get("/getUserAppointments",getUserAppointmentsController);
 router.post("/addAppointment",addAppointmentController);
 router.put("/updateAppointment/:appointmentId",updateAppointmentController);
 router.delete("/deleteAppointment/:appointmentId",deleteAppointmentController);
 router.post("/getSlots",suggestAppointmentController);


export default router