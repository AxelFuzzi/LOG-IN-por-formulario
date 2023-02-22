import path from 'path';

const loginController = {
  getLogin: (req, res) => {
    //Si se ingresa a la ruta /login estando previamente logueado, esta redireccionará al inicio
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.sendFile(path.join(process.cwd(), '/src/views/login.html'));
    }
  },
  postLogin: (req, res) => {
    res.redirect('/');
  },
  getFailLogin: (req, res) => {
    //Credenciales inválidas
    res.sendFile(path.join(process.cwd(), '/src/views/loginFail.html'));
  },
};

export default loginController;
