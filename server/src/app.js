const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const app = express();
const upload = multer()

const MetaAuth = require("meta-auth");

const metaAuth = new MetaAuth({
  banner: "Mirai Marketplace"
});

const { addBook, getBook, getSignedUrl, retrieveBookURL } = require("./bookStore");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/books", async (req, res) => {
  const { bookId } = req.query;
  const { bookTitle } = await getBook(bookId);
  if (bookTitle) {
    return res.status(200).json({ bookTitle });
  }
  return res.sendStatus(404);
});

app.get("/test", async (req, res) => {
  return res.status(200).json({ key: "it's working" });
});

app.post("/books", upload.any(), async (req, res) => {
  const { bookId, bookTitle } = req.body;
  const bookImage = req.files[0]
  const storageId = await addBook({ bookId, bookTitle, bookImage });
  const signedUrl = await getSignedUrl(storageId);
  if (signedUrl) {
    console.log(signedUrl);
    return res.status(200).send({ signedUrl });
  }
  return res.sendStatus(500);
});

app.get("/auth/:MetaAddress", metaAuth, (req, res) => {
  // Request a message from the server
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge);
  }
});

app.get("/auth/:MetaMessage/:MetaSignature", metaAuth, async (req, res) => {
  if (req.metaAuth && req.metaAuth.recovered) {
    // Signature matches the cache address/challenge
    // Authentication is valid, assign JWT, etc.
    const { bookId } = req.query;
    const { secret } = await getBook(bookId);
    const bookURL = await retrieveBookURL(secret)
    console.log("download", bookURL)
    if (secret) {
      return res.status(200).json({ bookURL });
    }
    return res.sendStatus(404);
  } else {
    // Sig did not match, invalid authentication
    res.status(400).send();
  }
});

module.exports = app;
