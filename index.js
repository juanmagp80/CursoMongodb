const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

connection();

const app = express();
const puerto = 3000;
app.use(cors());

app.use(express.json()); //recibir datos con content-type application/json

app.use(express.urlencoded({ extended: true })); //recibir datos con content-type application/x-www-form-urlencoded

const rutas_articulo = require("./rutas/Articulo");

app.use("/api", rutas_articulo);
app.get("/probando", (req, res) => {
  return res.status(200).send({
    message: "Hola mundo",
  });
});

app.listen(puerto, () => {
  console.log(`Server running on port ${puerto}`);
});
