import express from 'express';
const router = express.Router()
import faker from './faker/faker.js';
import { Server as httpServer } from 'http';
import { Server as ioServer } from 'socket.io';
import Sockets from './sockets.js';
import mongoose from 'mongoose';
import msgNormalizr from './normalizr/normalizer.js';

//--------------------------------------------------------
import session from 'express-session';
import storage from 'session-file-store';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';

const msgNormalizer = msgNormalizr;

const fakerjs = faker;

const app = express();
const serverHTTP = new httpServer(app);
const io = new ioServer(serverHTTP);

/* ----------------------------- socket settings ---------------------------- */
Sockets(io);

/* -------------------------- middlewares settings -------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));

//Inicializar el motor.
app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));

//-----------------------------productos Faker--------------------------------------

/*app.use('/', router.get('/api/productos-test',(req, res)=>{
  fakerjs();
  res.send('PRODUCTOS GENERADOS EN CONSOLA');
}) )*/

//---------------------------express-session-------------------------------------------
app.use(session({
  store: MongoStore.create({
      mongoUrl:"mongodb+srv://coderUser:123@cluster0.ldzjuyz.mongodb.net/DBcoderChat?retryWrites=true&w=majority",
      ttl:20
  }),
  secret: 'aspdiasc903ok1pkc',
  resave: false,
  saveUninitialized: false
}));

//---------------------------ruta genera prods faker-----------------------------------
/*app.use('/', router.get('/api/productos-test',(req, res)=>{
  const productos = fakerjs();
  res.send(productos); // envío mis productos (no los mando por consola)
}))
*/
/*app.use('/', router.get('/home',(req, res)=>{
  
  res.redirect('/'); 
}))*/

//----------------------------------Routers------------------------------------------------------
app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);


/* ----------------------------- server settings ---------------------------- */
const PORT = process.env.port || 3000;

const conexion = () => {
  mongoose.set('strictQuery',true).connect('mongodb+srv://coderUser:123@cluster0.ldzjuyz.mongodb.net/DBcoderChat?retryWrites=true&w=majority',
  {
      useNewUrlParser:true,
      useUnifiedTopology:true
  },error=>{
          if(error) console.log(error);
          else console.log("base mongoDB conectada");
      }); 
}
conexion();

//------------------------------mensajes normalizados-----------------------------------
msgNormalizer()

const server = serverHTTP.listen(PORT, (error) => {
  if (error) throw new Error(`Error en servidor ${error}`);
  console.log(`Running in http://localHost:${PORT}`);
});

/*//archivo faker/faker.js 

import { faker } from '@faker-js/faker';

    const generateProduct = ()=>{
        const product = {
            nombre: faker.commerce.productName(),
            precio: faker.datatype.number(),
            foto: faker.image.abstract()
        }
        return product // acá devuelvo ese producto de faker 
    }


const arrayProducts = ()=>{
    const products = [] //declaro el array vacío
        let cinco = 5
        for(let i = 0; i < cinco; i++){
            products.push(generateProduct()); // pusheo a mi array cada producto que se genere 
        }
    return products // devuelvo el array 
}

export default arrayProducts



// en archivo server.js
app.use('/', router.get('/api/productos-test',(req, res)=>{
  const productos = fakerjs();
  res.send(productos); // envío mis productos (no los mando por consola)
}) )


//archivo public/js/client.js : acá traemos para mostrar los prodductos en las vistas 

const productList = document.getElementById('product-list')

axios
.get("/api/productos-test") // acá con axios hacemos el get a la ruta correspondiente (recorda importar axios en tu index.html)
.then((products)=>{
const table = products.data.map((res)=>
`<div class ='table-responsive'>
<table class='table table-dark'>
  <tr>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Foto</th>
  </tr>
  <tr>
    <td>${res.nombre}</td>
    <td>$${res.precio}</td>
    <td>
      <img
      width='50'
      src=${res.foto}
      alt='Image not found'/>
    </td>
  </tr>
</table>
</div>`
  )
  productList.innerHTML = `<div>${table}</div>`
})
 */