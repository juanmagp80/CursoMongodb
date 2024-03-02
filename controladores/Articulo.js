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

const uno = (req, res) => {
  // Recoger un id por la url
  let id = req.params.id;

  // Buscar artículo
  Articulo.findById(id)
    .then((articulo) => {
      // Si no existe, devolver error
      if (!articulo) {
        return res.status(400).json({
          status: "Error",
          mensaje: "No se ha encontrado el artículo",
        });
      }

      // Devolver resultado
      return res.status(200).json({
        status: "Success",
        articulo,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        status: "Error",
        mensaje: "Ha ocurrido un error al buscar el artículo",
      });
    });
};
module.exports = { test, curso, crear, uno };
