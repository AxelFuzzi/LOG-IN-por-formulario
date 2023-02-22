import path from 'path';

const signupController = {
  getSignup: (req, res) => {
    //Si se ingresa a la ruta /signup estando previamente logueado, esta redireccionará al inicio
    if (req.isAuthenticated()){
      res.redirect('/');
    }else{
      res.sendFile(path.join(process.cwd(), '/src/views/signup.html'));
    }
  },
  postSignup: (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/');
    }
  },
  getFailSignup: (req, res) => {
    //Usuario ya registrado
    res.sendFile(path.join(process.cwd(), '/src/views/signupFail.html'));
  },
};

export default signupController;
