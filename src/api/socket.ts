// socket.js or socket.ts
import { io } from "socket.io-client";

export const socket = io("https://your-backend-api.com"); // Flask-SocketIO server URL
