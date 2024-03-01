const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mi_blog");
    console.log("Database connection success");
  } catch (error) {
    console.log("Database connection failed", error);
    throw new Error("Database connection failed");
  }
};
module.exports = { connection };
