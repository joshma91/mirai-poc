const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const MetaAuth = require("meta-auth");

const metaAuth = new MetaAuth({
  banner: "Mirai Marketplace"
});

const books = {};

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/books", (req, res) => {
  const { bookId } = req.query;
  if (books[bookId]) {
    return res.status(200).json({ bookTitle: books[bookId].bookTitle });
  }
  return res.sendStatus(404);
});

app.post("/books", (req, res) => {
  const { bookId, bookTitle, secret } = req.body;
  books[bookId] = { bookTitle, secret };
  return res.sendStatus(200);
});

app.get("/auth/:MetaAddress", metaAuth, (req, res) => {
  // Request a message from the server
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge);
  }
});

app.get("/auth/:MetaMessage/:MetaSignature", metaAuth, (req, res) => {
  if (req.metaAuth && req.metaAuth.recovered) {
    // Signature matches the cache address/challenge
    // Authentication is valid, assign JWT, etc.
    const { bookId } = req.query;
    if (books[bookId]) {
      return res.status(200).json({ secret: books[bookId].secret });
    }
  } else {
    // Sig did not match, invalid authentication
    res.status(400).send();
  }
});

module.exports = app;
