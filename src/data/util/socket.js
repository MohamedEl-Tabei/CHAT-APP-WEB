import { io } from "socket.io-client";
import variables from "../../base/variables";
const connected = (userId) => {
  let socket = io(variables.baseUrl);

  socket.emit("addToOnlineUsers", 1);
};
const Socket = { connected };

export default Socket;
