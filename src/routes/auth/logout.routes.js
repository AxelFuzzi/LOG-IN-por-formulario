import { Router } from 'express';
import logoutController from '../../controllers/auth/logout.controller.js';
import authenticationMiddleware from '../../middlewares/auth/auth.middleware.js';

const router = Router();

/* ---------------------------- cierre de sesión ---------------------------- */
router.get('/logout', authenticationMiddleware, logoutController.getLogout);

export default router;