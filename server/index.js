const express = require("express");
const cors = require("cors");
require("./db");
const blogRouter = require("./db/index.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use("/api", (req, res) => {
	res.send("Hello World");
});

app.listen(8080, () => {
	console.log("Server is listening on port 8080");
});
