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

const ref = firebase.database().ref("books6");
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

const addBook = async ({ bookId, bookTitle, bookImage }) => {
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
    bookImage
  };
  console.log("book", book)

  const newBook = await ref.push(book);
  // this is the automatically generated id that will be used as the identifier in GCS
  const id = newBook.path.pieces_[1];
  console.log(id);

  const update = {[id]: {...book, secret: id}}
  console.log("update", update)

  const res = await ref.update(update)

  return id;
};

const getSignedUrl = async (storageId) => {
  // creates a placeholder file in the bucket for the front-end upload
  const bucketFile = bucket.file(storageId);

  const config = {
    action: "write",
    expires: Date.now() + 10000,
    contentType: "application/pdf"
  };

  const signedUrl = await bucketFile.getSignedUrl(config);
  return signedUrl;
}

const retrieveBookURL = async (secret) => {
  const bucketFile = bucket.file(secret);
  const config = {
    action: "read",
    expires: Date.now() + 10000
  };

  const signedUrl = await bucketFile.getSignedUrl(config);
  return signedUrl;
}

module.exports = { addBook, getBook, getSignedUrl, retrieveBookURL };
