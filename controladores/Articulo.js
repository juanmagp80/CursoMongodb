const { __esModule } = require("validator/lib/isFloat");
const validator = require("validator");
const Articulo = require("../modelos/Articulo"); // importar el modelo de articulo

const test = (req, res) => {
  return res.status(200).json({
    message: "soy una accion de prueba",
  });
};

const curso = (req, res) => {
  return res.status(200).json([
    {
      curso: "master en react",
      autor: "victor robles",
      url: "victorroblesweb.es",
    },
    {
      curso: "master en node",
      autor: "victor robles",
      url: "victorroblesweb.es",
    },
  ]);
};
const crear = async (req, res) => {
  // Recoger parametros por post
  let parametros = req.body;
  // Validar datos (validar con express validator)
  try {
    let validar_titulo =
      !validator.isEmpty(parametros.titulo) &&
      validator.isLength(parametros.titulo, { min: 5, max: 100 });
    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if (!validar_titulo || !validar_contenido) {
      throw new Error("Todos los campos son obligatorios");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  // Crear el objeto a guardar
  try {
    const articulo = new Articulo(parametros);

    // asignar valores al objeto a guardar (asignar valores a los campos del objeto)

    // Guardar el articulo

    let articuloGuardado = await articulo.save();
    res.status(200).json({
      status: "success",
      articulo: articuloGuardado,
      message: "Articulo guardado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al guardar el articulo",
    });
  }
};
// Devolver una respuesta

// Devolver una respuesta

const listar = async (req, res) => {
  try {
    // Find
    const articulos = await Articulo.find({}).sort({ fecha: -1 });

    if (!articulos || articulos.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado artículos",
      });
    }

    return res.status(200).send({
      status: "success",
      articulos,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al listar los artículos",
    });
  }
};
module.exports = { test, curso, crear, listar };
