const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const books = {};

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/books", (req, res) => {
  const { bookId } = req.query;
  if (books[bookId]) {
    return res.status(200).json({ bookTitle: books[bookId] });
  }
  return res.sendStatus(404);
});

app.post("/books", (req, res) => {
  const { bookId, bookTitle } = req.body;
  books[bookId] = bookTitle;
  return res.sendStatus(200);
});

module.exports = app;
