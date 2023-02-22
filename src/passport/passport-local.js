import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/users.js';

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const existUser = await User.findOne({ email });
        if (existUser) {
          return done(null, false);
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        try {
          const user = await User.create(newUser);
          return done(null, user);
        } catch (error) {
          console.log(`Error creando el usuario: ${error}`);
          return done(error);
        }
      } catch (error) {
        console.log(`Falló el registro de usuario: ${error}`);
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        if (!user.comparePassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

export default passport;
