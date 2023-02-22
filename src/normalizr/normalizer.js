import {normalize, schema} from 'normalizr';
import msgContainer from '../DAO/contenedorMessage.js';
import util from "util"
const messageService = msgContainer;

const msgNormalizr = async ()=>{
    let contenido = await messageService.vistaMessages({_id: 0});
    // console.log(contenido);
    let cont = {id: '1', author:{id:'axelfuzzi@gmail.com', name:'axel fuzzi'}, comments: contenido}
    const contenidoID = JSON.parse(JSON.stringify(cont))
    

    const authorSchema = new schema.Entity("authors")

    const commentSchema = new schema.Entity("comments", {
        author:authorSchema
    }, {idAttribute:'_id'})

    const postSchema = new schema.Entity("post", {
        author: authorSchema,
        comments:[commentSchema]
    })

    function print(objeto) {
        console.log(util.inspect(objeto, false, 12, true))
      }

    console.log('OBJETO NORMALIZADO')
    const normalizedData = normalize(contenidoID, postSchema);
    print(normalizedData)
    console.log(JSON.stringify(normalizedData).length)

}

export default msgNormalizr




