import connectDB from './db/db';
import { config } from './config/config';
import app from './expressSetup';
const startServer = async () => {
  try {

    await connectDB();

    // Define the port, defaulting to 4000 if not specified in config
    const port = config.port || 4000;

    // Start the server on the specified port
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Handle server errors
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Trying another port...`);
        server.listen(0); // Listen on a random available port
      } else {
        throw err;
      }
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();