import { Schema, model } from 'mongoose';
const messageSchema = new Schema(
    {
      author:{
        id:String,
        nombre:String,
        apellido:String,
        edad:Number,
        alias:String,
        avatar:String,
      },
      text:String,
      
    },{versionKey:false}
)

export default model('message', messageSchema);
