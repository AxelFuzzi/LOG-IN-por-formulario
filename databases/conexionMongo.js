import mongoose from 'mongoose';

const conexion = async() => {
  try {
    await mongoose.set('strictQuery',true).connect('mongodb+srv://coderUser:123@cluster0.ldzjuyz.mongodb.net/DBcoderChat?retryWrites=true&w=majority',
  {
      useNewUrlParser:true,
      useUnifiedTopology:true
  });
  return console.log('conexion establecida')
  } catch (error) {
    return console.log(error)
  }
}

export default conexion
   


