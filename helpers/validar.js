const validator = require("validator");

const validarArticulo = (parametros) => {
  console.log(parametros.contenido);
  console.log(parametros.titulo);
  let validar_titulo =
    !validator.isEmpty(parametros.titulo) &&
    validator.isLength(parametros.titulo, { min: 5, max: 100 });

  let validar_contenido = !validator.isEmpty(parametros.contenido);
  if (!validar_titulo || !validar_contenido) {
    throw new Error("Todos los campos son obligatorios");
  }
};
module.exports = { validarArticulo };
