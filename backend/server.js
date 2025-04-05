import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";


const app = express()
const port = 4000;

app.use(express.json())
app.use(cors())

// db connect 
connectDB(); 

// api endpoints
app.use("/api/food",foodRouter)
app.use('/images',express.static('uploads'))

app.get("/", (req,res)=>{
res.send("Api Working")
})

app.listen(port,()=>{
    console.log(`Server Started On http://localhost:${port}`)
})

// ?retryWrites=true&w=majority&appName=Cluster0