const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  imageURL: { type: String },
  date: { type: Date, default: Date.now },
  previewLink: { type: String }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
