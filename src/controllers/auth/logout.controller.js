import path from 'path';

const logoutController = {
  getLogout: (req, res) => {
    const email = req.user.email;
    req.logout((err) => {
      if (err) {
        return console.info(err.message);
      }
    });

    res.render(path.join(process.cwd(), '/src/views/layouts/logout.hbs'), {
      email,
    });
  },
};

export default logoutController;
