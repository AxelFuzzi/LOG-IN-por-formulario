import { Router } from "express";
import faker from '../../faker/faker.js'

const router = Router();

const fakerjs = faker;

router.get('/api/productos-test',(req, res)=>{
    const productos = fakerjs();
    res.send(productos); 
})

export default router;