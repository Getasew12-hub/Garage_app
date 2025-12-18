import express from 'express';
import { checkAuthController, loginController, logoutController, signupController } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protecedRouter.js';

const router= express.Router();

router.post('/signup',signupController);
router.post('/login',loginController);
router.post('/logout',logoutController);

router.post("/check-auth", protectRoute,checkAuthController);


export default router;