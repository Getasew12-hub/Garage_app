import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";

import { adminProtectRoute, protectRoute } from "./middleware/protecedRouter.js";
import { connectDB } from "./config/db.js";
import vehicleRouter from "./routers/vehicle.router.js";
import authRouter from "./routers/auth.router.js";
import appointmentRouter from "./routers/appointment.router.js";
import serviceJobRouter from "./routers/servicejob.router.js";
import adminRouter from "./routers/admin.router.js";
import cors from "cors";

env.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin:process.env.NODE_ENV === "development" ? "http://localhost:5173" :process.env.PRODUCTION_URL,
  credentials: true
}))

// Routes
app.use("/api/auth", authRouter);
app.use("/api/vehicle",protectRoute, vehicleRouter);
app.use("/api/appointment", protectRoute, appointmentRouter);
app.use("/api/service-job", serviceJobRouter);
app.use("/api/admin",adminProtectRoute, adminRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});