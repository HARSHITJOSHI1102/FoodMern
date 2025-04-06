import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://Harshitdb:Hj8joshi1234@cluster0.kisp2xa.mongodb.net/").then(()=>console.log("DB Connected"))
} 


