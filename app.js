import express, { json } from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { default as MongoStore } from 'connect-mongo';

import passport from './src/passport/passport-local.js';

import homeRouter from './src/routes/home.routes.js';
import authRouter from './src/routes/auth/index.routes.js';
//-------------------------------------------------------------
import msgNormalizr from './src/normalizr/normalizer.js';

const msgNormalizer = msgNormalizr;

dotenv.config();
const app = express();
import './src/databases/connectionMongoDB.js'

/* -------------------------- middlewares settings -------------------------- */
app.use(logger('dev'));
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIES_SECRET));

/* -------------------------- template engine settings -------------------------- */
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './src/views/layouts',
    partialsDir: './src/views/partials/',
  })
);
app.set('view engine', 'hbs');
app.set('views', './src/views');

/* ---------------------------- session settings ---------------------------- */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collection: 'sessions',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: {
      maxAge: 600000,
    },
  })
);

/* ---------------------------- passport settings --------------------------- */
app.use(passport.initialize());
app.use(passport.session());

/* -------------------------- routes settings -------------------------- */
app.use(homeRouter);
app.use('/', authRouter);

/*------------------------------mensajes normalizados------------------------*/
msgNormalizer()

export default app;
