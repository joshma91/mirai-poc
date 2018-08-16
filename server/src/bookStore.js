const admin = require("firebase-admin");
require("dotenv").config();

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: "https://mirai-poc.firebaseio.com/"
});

const ref = firebase.database().ref("books");

const getBook = async bookId => {
  const bookRef = await ref
    .orderByChild("bookId")
    .equalTo(bookId)
    .once("value");

  const id = Object.keys(bookRef.val())[0];
  book = bookRef.val()[id];

  return book;
};

const addBook = async ({ bookId, bookTitle, secret }) => {
  // check if the book already exists. if so, exit
  const bookRef = await ref
    .orderByChild("bookId")
    .equalTo(bookId)
    .once("value");
  const bookExists = Boolean(bookRef.val());
  console.log("bookExists:", bookExists);
  if (bookExists) return false;

  const book = {
    bookId,
    bookTitle,
    secret
  };

  ref.push(book);
  return true;
};

module.exports = { addBook, getBook };
