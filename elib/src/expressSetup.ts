import express from 'express'

const app = express();


// import Routes

app.get('/',(req,res,next)=>{
    res.json({
        message:"saad"
    })
})


export default app