import { Router } from 'express';
import loginRouter from './login.routes.js';
import signupRouter from './signup.routes.js';
import logoutRouter from './logout.routes.js';
import fakerRouter from './faker.routes.js'

const router = Router();

//Obtiene todas las subrutas de los diferentes ficheros y las engloba en router.
router.use(loginRouter);
router.use(signupRouter);
router.use(logoutRouter);
router.use(fakerRouter);

export default router;
