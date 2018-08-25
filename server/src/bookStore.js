const admin = require("firebase-admin");
require("dotenv").config();

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const ref = firebase.database().ref("books4");
const bucket = firebase.storage().bucket();

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

const addBook = async ({ bookId, bookTitle }) => {
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
    bookTitle
  };

  const newBook = await ref.push(book);
  // this is the automatically generated id that will be used as the identifier in GCS
  const id = newBook.path.pieces_[1];
  console.log(id);

  const bucketFile = bucket.file(id);

  const config = {
    action: "write",
    expires: Date.now() + 3600,
    contentType: "application/pdf"
  };

  const signedUrl = await bucketFile.getSignedUrl(config);
  return signedUrl;
};

module.exports = { addBook, getBook };
