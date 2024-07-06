import app from './expressSetup'
import {config} from './config/config'
import connectDB from './db/db';


const startServer = ()=>{

  connectDB();
  const port = config.port || 8000;

  app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
  })
}

startServer();