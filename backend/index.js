import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import todoRouter from "./router/todo.route.js"
import userRouter from "./router/user.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()
app.use(express.json());
app.use(cookieParser()); 
dotenv.config();

const port = process.env.PORT || 8000
// middlewares

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials : true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders : ["Content-Type " , "Authorization"]
}))
// connect to mongodb
try {
    mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to DB");
    
} catch (error) {
    console.log(error);
    
}
//routes

app.use("/todo",todoRouter);
app.use("/user",userRouter);

app.listen(port, () => {
  console.log(`Example app  listening on port ${port}`)
})
