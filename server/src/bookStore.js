const admin = require("firebase-admin");
require("dotenv").config();

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const ref = firebase.database().ref("books");

const getBook = async bookId => {
  const bookRef = await ref
    .orderByChild("bookId")
    .equalTo(bookId)
    .once("value");

  if (bookRef.val()) {
    const id = Object.keys(bookRef.val())[0];
    book = bookRef.val()[id];

    return book;
  }
  return false;
};

const addBook = async ({ bookId, bookTitle, bookFile }) => {

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
    bookFile
  };

  console.log(book)

  const res = await ref.push(book);
  console.log(res)
  if(res) return true;
};

module.exports = { addBook, getBook };
