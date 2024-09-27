import express from 'express'
import { globalErrorHandler } from './middleware/gobalErrorHandler';

const app = express();

app.use(express.json());

// import user routes
import userRouter from './user/user.router';

app.use('/api/users' ,userRouter)

// Global error handler
app.use(globalErrorHandler);

export default app