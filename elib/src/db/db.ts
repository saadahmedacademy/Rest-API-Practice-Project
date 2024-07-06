import mongoose from "mongoose";
import { config } from "../config/config";

// To connect to the database
const connectDB = async () =>{

    try {
        mongoose.connection.on('connected', ()=>{
            console.log(`Connected to database successfully`)
        })
 
        mongoose.connection.on('error', (err)=>{
        console.log("Error in database connection: ", err)
        })
      
        await mongoose.connect(`${config.mongoUrl}/${config.websiteName}`);
    
    } catch (error) {
        console.error(`Failed to connect to database: ${error}`);
        process.exit(1);
    }
}

export default connectDB
