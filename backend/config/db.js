import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect("").then(()=>console.log("DB Connected"))
} 

//mongodb+srv://Harshitdb:<db_password>@cluster0.kisp2xa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
