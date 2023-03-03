console.log("Hello World!");
const express = require("express");
const router = require("./routes/patient");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const port = process.env._PORT || 5000;

const app = express();

const host = "localhost";
app.use(bodyparser.json());
app.use("/", router);
app.use(express.static(path.join(__dirname, "./healthpoint/build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./healthpoint/build/index.html"))
})

// app.get('/', (req, res) => {
//     res.send("welcome to rest api");
// });

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODB_URL);

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}



app.listen(port, () => {
    console.log(`server is running at http://${host}:${port}/`);
});