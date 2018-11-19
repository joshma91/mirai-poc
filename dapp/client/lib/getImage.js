const getImage = async (bookId) => {

  const API_URL = "http://localhost:5678/books/image";

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
