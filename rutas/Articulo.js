const express = require("express");

const router = express.Router();
const ArticuloController = require("../controladores/Articulo");

router.get("/ruta-de-prueba", ArticuloController.test);
router.get("/curso", ArticuloController.curso);

router.post("/crear", ArticuloController.crear);
router.get("/articulos", ArticuloController.listar);
router.get("/articulo/:id", ArticuloController.uno);

module.exports = router;
