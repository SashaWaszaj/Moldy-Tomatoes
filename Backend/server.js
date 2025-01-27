const express = require("express");
const cors = require("cors");
const movieRoutes = require("./Routes/Movie.routes");

require("./Config/config.mongoose");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use("/", movieRoutes);

//http://localhost:8080/
app.listen(port, () => console.log(`Conection succesfull at port ${port}`));