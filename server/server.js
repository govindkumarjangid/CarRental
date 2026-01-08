import app from './index.js';
import http from 'http';
import { initSocket } from './src/configs/socket.js';

//* port 
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

//* Initialize Socket.io
initSocket(server);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});