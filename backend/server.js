import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express()
const port = process.env.PORT || 4000;

const frontendurl = "https://foodmernfrontend.onrender.com"

app.use(express.json())
app.use(cors({
  origin: frontendurl, // <-- this needs to change
  credentials: true,
}));


// db connect 
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use('/images', express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("Api Working")
})

app.listen(port, () => {
  console.log(`Server Started On http://localhost:${port}`)
})

// ?retryWrites=true&w=majority&appName=Cluster0
