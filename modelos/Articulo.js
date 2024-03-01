const { Schema, model } = require("mongoose");

const articuloSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: false,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Articulo", articuloSchema, "articles");
