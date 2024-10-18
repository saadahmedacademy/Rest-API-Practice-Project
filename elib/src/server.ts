import app from './expressSetup';
import { config } from './config/config';
import connectDB from './db/db';

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log('Database connected successfully');

    const port = config.port || 4000;

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit with failure
  }
};

startServer();
