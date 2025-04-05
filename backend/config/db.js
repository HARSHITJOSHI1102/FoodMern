import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://Harshitdb:Hj8joshi1234@cluster0.kisp2xa.mongodb.net/food-del").then(()=>console.log("DB Connected"))
} 

//mongodb+srv://Harshitdb:<db_password>@cluster0.kisp2xa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0