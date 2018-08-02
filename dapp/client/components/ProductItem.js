import {
  Image,
  Grid,
  Header,
  Button,
  List,
  Icon,
  Loader
} from "semantic-ui-react";
const API_URL = "http://localhost:5678/books";

export default class ProductItem extends React.Component {
  state = {
    product: null
  };

  componentDidMount = async () => {
    const { id } = this.props;

    const product = await this.retrieveProductFromBlockchain();
    const title = await fetch(`${API_URL}?bookId=${id}`)
      .then(res => res.text())
      .then(text => {
        return JSON.parse(text).bookTitle;
      });

    product.title = title;
    this.setState({ product });
  };

  retrieveProductFromBlockchain = async () => {
    const { contract, accounts, id } = this.props;

    const product = await contract.methods
      .getProductById(id)
      .call({ from: accounts[0] });

    return product;
  };

  render() {
    const { product } = this.state;
    if (!product) return <Loader active />;
    return (
      <div>
        <img
          className="product-image"
          src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
          alt=""
        />
        <div className="title">{product.title}</div>
        <div className="price">{product.price}</div>
        <Button>Buy!</Button>
        <style jsx>{`
          .product-image {
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}
