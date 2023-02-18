import messageSchema from '../utils/createTableMsgs.js'

class messageDAO{
    async vistaMessages(){
        return messageSchema.find();
    }
}

export default new messageDAO();