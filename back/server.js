const { dbConnection } = require("./database/config");
const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;
async function connectDB() {
  await dbConnection();
}

connectDB();
app.use(cors());
app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));
app.use(express.json());

app.use("/api/user", require("./routes/user"));
