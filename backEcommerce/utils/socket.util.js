const {Server} = require("socket.io");

let io ;
const initSocket = (server) => {
   io = new Server(server,{
    cors:{origin:"http://localhost:8080"}
   });
   
io.on("connection", (socket)=>{
    console.log("user connected", socket.id);
    socket.on("joinRoom",(userId)=>{
        console.log("JOIN ROOM CALLED", userId);
        socket.userId = userId;
      socket.join(userId);
      console.log("Rooms after join:", socket.rooms);

    })
    socket.on("addCart", (userId, product)=>{
        if (socket.userId) {
        socket.emit("addCart", product);
    }
    })


    socket.on("disconnect", ()=>{
        console.log("user disconnected.", socket.id)
    })
})

   return io
};


function getIO() {
    if(!io) return { message:"socket not initialize."};
    return io;
}


module.exports = {initSocket, getIO}