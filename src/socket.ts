import socketIO, { Server } from "socket.io";
let io: Server;

export default {
  init(httpServer: any) {
    io = socketIO(httpServer);
    return io;
  },
  getIO() {
    if (!io) {
      throw new Error("Socket.io is not initialized!");
    }
    return io;
  },
};
