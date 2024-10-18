import express from 'express'
import { globalErrorHandler } from './middleware/gobalErrorHandler';

const app = express();

app.use(express.json());

// import user routes
import userRouter from './user/user.router';
import bookRouter from './book/book.route';

app.use('/api/users' ,userRouter)
app.use('/api/books' ,bookRouter)

// Global error handler
app.use(globalErrorHandler);

export default app