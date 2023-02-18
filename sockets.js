//import ProductContainer from './apis/productContainer.js';
import MsgContainer from './apis/msgContainer.js';

//const productsApi = ProductContainer;
const messagesApi = MsgContainer;

const Sockets = (io) => {
  io.on('connection', async (socket) => {
    console.log(`\nUn cliente con el id: [${socket.id}] se ha conectado.`);

    // carga inicial de productos
    //socket.emit('view-products', productsOnFront());

    // carga inicial de mensajes
    socket.emit('view-messages', await messagesApi.messageVcontroller());

    socket.on('disconnect', (_) => {
      console.log(`El cliente con el id: [${socket.id}] se ha desconectado.\n`);
    });
  });
};

export default Sockets;
