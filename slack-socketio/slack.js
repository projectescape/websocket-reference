const express = require("express");
const app = express();
const socketio = require("socket.io");

let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

// Main namespace
io.on("connection", socket => {
  let nsData = namespaces.map(ns => {
    return {
      img: ns.img,
      endpoint: ns.endpoint
    };
  });
  // console.log(nsData);
  socket.emit("nsList", nsData);
});

// Other namespaces
namespaces.forEach(namespace => {
  io.of(namespace.endpoint).on("connection", nsSocket => {
    console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
  });
});
