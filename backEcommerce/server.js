const dotenv = require("dotenv");
dotenv.config();

const startServer = require("./app");


const init = async () => {
  const server = await startServer(); // ✅ await zaroori hai

  server.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

init();
