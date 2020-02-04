const socket = io("http://localhost:9000");

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("nsList", nsData => {
  let namespacesDiv = document.querySelector(".namespaces");

  namespacesDiv.innerHTML = "";

  nsData.forEach(ns => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}" /></div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(elem => {
    // console.log(elem);
    elem.addEventListener("click", e => {
      const nsEndpoint = elem.getAttribute("ns");
      console.log(`${nsEndpoint} I should go to now`);
    });
  });

  const nsSocket = io("http://localhost:9000/wiki");

  nsSocket.on("nsRoomLoad", nsRooms => {
    // console.table(nsRooms);
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
    nsRooms.forEach(room => {
      let glyph = room.privateRoom ? "lock" : "globe";
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
    });
  });

  Array.from(document.getElementsByClassName("room")).forEach(elem => {
    elem.addEventListener("click", e => {
      console.log("Someone Clicked on ", e.target.innerText);
    });
  });
});

socket.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "Data from the client" });
});

document.querySelector("#message-form").addEventListener("submit", event => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClients", msg => {
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});
