const { Server } = require("socket.io");

let io;
const initSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "http://localhost:8080" }
    });


    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth?.token;

            if (!token) {
                return next(new Error("Unauthorized"));
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            socket.user = decoded;
            socket.userId = decoded.id;

            socket.join(socket.userId);

            next();
        } catch (error) {
            return next(new Error("Invalid or expired token"));
        }
    });


    io.on("connection", (socket) => {
        socket.on("joinRoom", (userId) => {
            socket.userId = userId;
            socket.join(userId);

        })
        socket.on("addCart", (userId, product) => {
            if (socket.userId) {
                io.to(socket.userId).emit("addCart", product);
            }
        }),
        socket.on("addAndRemovewishList", (product)=>{
            console.log(socket?.userId, product)
            if(socket.userId){
                io.to(socket.userId).emit("addAndRemovewishList", product)
            }
        })


        socket.on("disconnect", () => {
            console.log("user disconnected.", socket.id)
        })
    })

    return io
};


function getIO() {
    if (!io) return { message: "socket not initialize." };
    return io;
}


module.exports = { initSocket, getIO }