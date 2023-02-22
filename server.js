import { Server as httpServer } from 'http';
import { Server as ioServer } from 'socket.io';
import app from './app.js';
import Sockets from './sockets.js';

const serverHTTP = new httpServer(app);
const io = new ioServer(serverHTTP);

/* ----------------------------- socket settings ---------------------------- */
Sockets(io);

/* ----------------------------- server settings ---------------------------- */
const PORT = process.env.port || 8080;
const server = serverHTTP.listen(PORT, (error) => {
  if (error) throw new Error(`Error en el servidor: ${error}`);
  console.info(
    `Servidor HTTP escuchando en el puerto ${server.address().port}`
  );
});
