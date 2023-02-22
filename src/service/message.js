import messageDAO from '../DAO/contenedorMessage.js'

class messageService{
    constructor(){}

    async vistaMessage(message){
        return messageDAO.vistaMessages(message);
    }
}

export default new messageService();