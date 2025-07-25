import app from './app';
import dotenv from './config/dotenv';

const PORT = dotenv.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is Running on Port: ${PORT}`);
})