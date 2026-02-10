const dotenv = require("dotenv");
dotenv.config();

const {connectDB} = require("./config/db");
const app = require("./app");

// Connect Database
// connectDB();

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
