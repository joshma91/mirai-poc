const getImage = async (bookId) => {

  const API_URL = "https://mirai-server.now.sh/books/image";

  const imageUrl = await fetch(
    `${API_URL}?bookId=${bookId}`
  ).then(res => res.text())
  .then(text => {
      if(text == "Not Found") {
      return null
    }
    return JSON.parse(text).imageURL
  })

  return imageUrl
}
export default getImage
