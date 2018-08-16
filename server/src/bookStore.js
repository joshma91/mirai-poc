const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mirai-poc.firebaseio.com/"
});

const ref = firebase.database().ref("books");

const getBookSnapshot = async bookId => {
  const bookRef = ref.orderByChild("bookId").equalTo(bookId);

  const snap = await bookRef.once("value");
  return snap;
};

const getBookTitle = async bookId => {
  const bookSnap = await getBookSnapshot(bookId);
  let bookTitle;
  bookSnap.forEach(child => {
    bookTitle = child.val().bookTitle;
    return;
  });
  return bookTitle;
};

const getBookSecret = async bookId => {
  const bookSnap = await getBookSnapshot(bookId);
  let bookSecret;
  bookSnap.forEach(child => {
    bookSecret = child.val().secret;
    return;
  });
  return bookSecret;
};

const addBook = async ({ bookId, bookTitle, secret }) => {
  // check if the book already exists. if so, exit
  const snap = await getBookSnapshot(bookId);
  const bookExists = Boolean(snap.val());
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

module.exports = { addBook, getBookTitle, getBookSecret };
