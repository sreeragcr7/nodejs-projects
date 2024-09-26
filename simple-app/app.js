const express = require("express");
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/mongoDb')


const productRouter = require("./routes/product");
const server = 2000 || process.env.PORT;

//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  const file = path.join(__dirname, 'index.html')
  res.sendFile(file);
});

dbConnect()

app.listen(server, () =>
console.log(`server started at http://localhost:${server}`) );
