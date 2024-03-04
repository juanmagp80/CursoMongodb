const { __esModule } = require("validator/lib/isFloat");
const Articulo = require("../modelos/Articulo"); // importar el modelo de articulo
const { validarArticulo } = require("../helpers/validar");
const fs = require("fs");
const path = require("path");

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
  console.log(parametros);
  // Validar datos (validar con express validator)
  try {
    validarArticulo(parametros);
    console.log(validarArticulo(parametros));
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "faltan datos por enviar",
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
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "faltan datos por enviar",
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
const subir = (req, res) => {
  // configurar multer en la ruta
  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "error",
      message: "peticion invalida",
    });
  }
  // recoger el archivo de la peticion
  console.log(req.file);
  // nombre del archivo
  let nombreArchivo = req.file.originalname;

  // extension del archivo
  let archivo_split = nombreArchivo.split(".");
  let archivo_extension = archivo_split[1];

  // comprobar extension
  if (
    archivo_extension != "png" &&
    archivo_extension != "jpg" &&
    archivo_extension != "jpeg" &&
    archivo_extension != "gif"
  ) {
    fs.unlink(req.file.path, (error) => {
      // borrar el archivo subido
      if (error) throw error;
      return res.status(400).json({
        status: "error",
        message: "La extension del archivo no es valida",
      });
    });
  } else {
    let editarId = req.params.id;
    // Recoger datos del body
    // Validamos datos

    // Buscar y actualizar el articulo
    Articulo.findOneAndUpdate(
      { _id: editarId },
      { imagen: req.file.filename },
      { new: true }
    )
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
  }
};

// si es valido, buscar el articulo, asignarle el nombre de la imagen y actualizarlo
// devolver una respuesta

// devolver una respuesta
const imagen = (req, res) => {
  let fichero = req.params.fichero;
  let ruta_fisica = "./imagenes/articulos/" + fichero;

  fs.stat(ruta_fisica, (error, existe) => {
    if (existe) {
      return res.sendFile(path.resolve(ruta_fisica));
    } else {
      return res.status(404).json({
        status: "error",
        message: "La imagen no existe",
      });
    }
  });
};

const buscador = async (req, res) => {
  try {
    // Sacar el string de busqueda
    let busqueda = req.params.busqueda;
    // Find OR y puedes aplicar expresiones reg
    // Orden
    // Ejecutar consulta
    let articulos = await Articulo.find({
      $or: [
        { titulo: { $regex: busqueda, $options: "i" } },
        { contenido: { $regex: busqueda, $options: "i" } },
      ],
    })
      .sort({ fecha: -1 })
      .exec();

    if (!articulos || articulos.length < 1) {
      return res.status(404).json({
        status: "error",
        mensaje: "No hay articulos que coincidan",
      });
    }
    return res.status(200).json({
      status: "success",
      articulos,
    });
    // Devolver resultados
  } catch (error) {
    return res.status(404).json({
      status: "error",
      mensaje: "Fallo la algo a la hora de realizarla busqueda ",
    });
  }
};

module.exports = {
  test,
  curso,
  crear,
  uno,
  listar,
  borrar,
  editar,
  subir,
  imagen,
  buscador,
};
