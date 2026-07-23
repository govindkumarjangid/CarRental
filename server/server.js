import app from './index.js';
import http from 'http';
import { initSocket } from './src/configs/socket.config.js';

const PORT = process.env.PORT || 3000;
const MAX_RETRIES = 3;
let retryCount = 0;
const RETRY_DELAY_MS = 5000;

const server = http.createServer(app);

//* Initialize Socket.io
initSocket(server);

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}...`);
    retryCount = 0;
  });
};

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`⚠️ Retrying to start server in ${RETRY_DELAY_MS / 1000}s... (Attempt ${retryCount}/${MAX_RETRIES})`);
      setTimeout(() => {
        server.close();
        startServer();
      }, RETRY_DELAY_MS);
    } else {
      console.error('🚨 Max server start retries reached. Exiting process.');
      process.exit(1);
    }
  } else {
    console.error(`❌ Server Error: ${err.message}`);
    process.exit(1);
  }
});

startServer();