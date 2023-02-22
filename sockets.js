import MsgContainer from './src/apis/msgContainer.js';

//const productsApi = new ProductContainer();
const messagesApi = MsgContainer;

const Sockets = (io) => {
  io.on('connection', async (socket) => {
    console.log(`\nUn cliente con el id: [${socket.id}] se ha conectado.`);

    /*// carga inicial de productos
    socket.emit('view-products', await productsApi.readProducts());*/

    // carga inicial de mensajes
    socket.emit('view-messages', await messagesApi.messageVcontroller());

    socket.on('disconnect', (_) => {
      console.log(`El cliente con el id: [${socket.id}] se ha desconectado.\n`);
    });
  });
};

export default Sockets;