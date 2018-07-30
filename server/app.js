const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const books = {};

app.use(cors());
app.use(bodyParser.json());

app.get("/books", (req, res) => {
  const { bookId } = req.query;
  console.log('GET request logged')
  console.log('bookId', bookId)
  if (books[bookId]) {
    return res.status(200).json({ bookTitle: books[bookId] });
  }
  return res.sendStatus(404);
});

app.post("/books", (req, res) => {
  const { bookId, bookTitle } = req.body;
  console.log('POST request logged')
  console.log('body', req.body)
  books[bookId] = bookTitle;
  return res.sendStatus(200);
});

module.exports = app;
