const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./imagenes/articulos");
  },
  filename: (req, file, cb) => {
    cb(null, "articulo-" + Date.now() + "." + file.originalname);
  },
});
const subidas = multer({ storage: storage });

const router = express.Router();
const ArticuloController = require("../controladores/Articulo");

router.get("/ruta-de-prueba", ArticuloController.test);
router.get("/curso", ArticuloController.curso);

router.post("/crear", ArticuloController.crear);
router.get("/articulo/:id", ArticuloController.uno);
router.get("/articulos", ArticuloController.listar);
router.delete("/articulo/:id", ArticuloController.borrar);
router.put("/articulo/:id", ArticuloController.editar);
router.post(
  "/subir-imagen/:id",
  [subidas.single("file0")],
  ArticuloController.subir
);
router.get("/imagen/:fichero", ArticuloController.imagen);
router.get("/buscar/:busqueda", ArticuloController.buscador);
module.exports = router;
