import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//communication Event
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;
  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(`Server Broadcast: ${message}`);
    });
  });
  //catching error
  socket.on("error", (err) => {
    console.log(`Error: ${err.message}: ${ip}`);
  });
  //check if offline
  socket.on("close", () => {
    console.log("client disconnected.");
  });
});
