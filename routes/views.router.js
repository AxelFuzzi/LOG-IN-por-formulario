import { Router } from "express";
import faker from '../faker/faker.js'

const router = Router();

const fakerjs = faker;

router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/',(req,res)=>{
    res.render('login');
})

router.get('/home',(req, res)=>{
    res.render('home')
})

router.get('/api/productos-test',(req, res)=>{
    const productos = fakerjs();
    res.send(productos); 
})

export default router;