const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
const request = require("request-promise");

const myServer = require("./index");

test("should return null when bookID does not exist", async t => {
  const service = micro(myServer);
  const url = await listen(service);

  // test GET request with bookId that does not exist
  const responseBody = await request(`${url}?bookId=1234`);
  const response = JSON.parse(responseBody);
  t.deepEqual(response.data, null);

  service.close();
});

test("should return book title after successful insert", async t => {
  const service = micro(myServer);
  const url = await listen(service);

  // test POST request with bookId and bookTitle
  const options = {
    method: "POST",
    uri: url,
    body: { bookId: "abc", bookTitle: "The Alphabet Book" },
    json: true
  };
  const postResponse = await request(options);
  t.deepEqual(postResponse.data.ok, true);

  // test GET request with bookID that should exist
  const responseBody = await request(`${url}?bookId=abc`);
  const response = JSON.parse(responseBody);
  t.deepEqual(response.data, { bookTitle: "The Alphabet Book" });

  service.close();
});
