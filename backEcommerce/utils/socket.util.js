const {Server} = require("socket.io");

let io ;
const initSocket = (server) => {
   io = new Server(server,{
    cors:{origin:"http://localhost:8080"}
   });

   
io.on("connection", (socket)=>{
    console.log("user connected", socket.id);

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