import express,{Request,Response,NextFunction} from 'express'
import { HttpError } from 'http-errors';
import { config } from './config/config';

const app = express();


// import Routes

app.get('/',(req,res,next)=>{
    res.json({
        message:"saad"
    })
})

// Global error handler
app.use((err:HttpError,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = err.statusCode || 500

    return res.status(statusCode).json({
        message:err.message || "Internal Server Error",
        errorStack:config.showError === "development" ? err.stack : ""
    })
});

export default app