import express from 'express';
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.SERVER_PORT

app.listen(PORT,(req, res)=>{
    console.log(`server is running on port ${PORT}`);

})