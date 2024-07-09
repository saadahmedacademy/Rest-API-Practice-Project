import express from 'express';

// create user routes
const userRouter = express.Router();

userRouter.post('/register',(req, res)=>{
    res.json({message:"user Registered"})
})


export default userRouter;