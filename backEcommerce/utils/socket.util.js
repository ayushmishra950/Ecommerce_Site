const {Server} = require("socket.io");

let io ;
const initSocket = (server) => {
   io = new Server(server,{
    cors:{origin:"http://localhost:8080"}
   });
let users = {};
   
io.on("connection", (socket)=>{
    console.log("user connected", socket.id);
    socket.on("joinRoom",(userId)=>{
      socket.join(userId);
    })
    socket.on("addCart", (userId, product)=>{
            io.to(userId).emit("addCart", product);
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