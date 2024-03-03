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

const uno = async (req, res) => {
  try {
    // Recoger id por la url
    let id = req.params.id;
    // Buscar articulo
    let articulo = await Articulo.findById(id);

    // Devolver resultado
    return res.status(200).json({
      status: "success",
      articulo,
    });
  } catch (error) {
    // Si no existe articulo devuelve esto
    return res.status(400).json({
      status: "error",
      message: "Un error ha ocurrido mientras se obtenia el articulo",
    });
  }
};
// listar articulos

const listar = (req, res) => {
  Articulo.find({})

    .then((articulos) => {
      if (!articulos) {
        return res.status(404).json({
          status: "error",

          mensaje: "No se han encontrado articulos",
        });
      }

      return res.status(200).send({
        status: "success",

        articulos,
      });
    })

    .catch((error) => {
      return res.status(500).json({
        status: "error",

        mensaje: "Ha ocurrido un error al listar los articulos",

        error: error.message,
      });
    });
};

// Borrar articulo
const borrar = (req, res) => {
  const id = req.params.id;

  Articulo.findOneAndDelete({ _id: id }) // Usamos _id como filtro
    .then((articuloEliminado) => {
      if (!articuloEliminado) {
        return res.status(404).json({
          status: "Error",
          message: "Articulo no encontrado",
        });
      }
      return res.status(200).json({
        status: "Success",
        message: "Articulo eliminado con éxito",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "Error",
        message: "Error al eliminar el artículo: " + error.message,
      });
    });
};
const editar = (req, res) => {
  // Recoger id del cliente a editar
  let editarId = req.params.id;
  // Recoger datos del body
  let parametros = req.body;
  // Validamos datos
  try {
    let validar_titulo = !validator.isEmpty(parametros.titulo);
    let validar_contenido = !validator.isEmpty(parametros.contenido);
    if (!validar_titulo || !validar_contenido) {
      throw new Error("No se ha validado la info");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }
  // Buscar y actualizar el articulo
  Articulo.findOneAndUpdate({ _id: editarId }, req.body, { new: true })
    .then((clienteActualizado) => {
      if (!clienteActualizado) {
        return res.status(500).json({
          status: "error",
          mensaje: "Error al actualizar",
        });
      }
      // Devolver respuesta
      return res.status(200).json({
        status: "success",
        cliente: clienteActualizado,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        mensaje: "Error al actualizar",
      });
    });
};
module.exports = { test, curso, crear, uno, listar, borrar, editar };
