const express = require("express");
const app = express();
const db = require("./config/db");

db();

// app.get("/", (req, res) => {
//   res.send("Dinesh");
// });
app.use(express.json());

app.use("/api/user", require("./routes/user"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
