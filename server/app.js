const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const books = {};

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/books", (req, res) => {
  const { bookId } = req.query;
  if (books[bookId]) {
    res.status(200).json({ bookTitle: books[bookId] });
  }
  res.sendStatus(404);
});

app.post("/books", (req, res) => {
  const { bookId, bookTitle } = req.body;
  books[bookId] = bookTitle;
  res.sendStatus(200);
});

module.exports = app;
