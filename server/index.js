const { json, send, sendError } = require("micro");
const qs = require('querystring');
const url = require('url');

const store = {};

async function postHandler(req) {
  const data = await json(req);
  const { bookId, bookTitle } = data;

  store[bookId] = bookTitle
  return { data: { ok: true } }
}

async function getHandler(req) {
  const query = qs.parse(url.parse(req.url).query);
  const { bookId } = query

  if (store[bookId] !== undefined) {
    return { data: { bookTitle: store[bookId] } }
  }
  return { data: null }
}

module.exports = async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        return send(res, 200, await postHandler(req))
      case "GET":
        return send(res, 200, await getHandler(req))
      default:
        return send(res, 405, "Invalid method");
    }
  } catch (err) {
    sendError(req, res, err);
  }
};
