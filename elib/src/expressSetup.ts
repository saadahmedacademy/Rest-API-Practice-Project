import express from 'express'
import createHttpError from 'http-errors';
import { globalErrorHandler } from './middleware/gobalErrorHandler';

const app = express();


// import Routes

app.get('/',(req,res,next)=>{

    const error =  createHttpError(400,"Something went wrong here");
    throw error;
    
})

// import user routes
import userRouter from './user/user.router';
app.use('/api/users' ,userRouter)

// Global error handler
app.use(globalErrorHandler);

export default app