import {
  Image,
  Grid,
  Header,
  Button,
  List,
  Icon,
  Label,
  Loader
} from "semantic-ui-react";

const API_URL = "http://localhost:5678/books";

export default class ProductItem extends React.Component {
  state = { product: null };

  componentDidMount = async () => {
    const { contract, accounts, id } = this.props;

    const product = await contract.methods
      .getProductById(id)
      .call({ from: accounts[0] });

    const title = await fetch(`${API_URL}?bookId=${id}`)
      .then(res => res.text())
      .then(text => JSON.parse(text).bookTitle);

    this.setState({ product: { ...product, title } });
  };

  render() {
    const { product } = this.state;
    if (!product) return <Loader active />;
    return (
      <div className="wrapper">
        <img
          className="product-image"
          src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
          alt=""
        />
        <div className="title">{product.title}</div>
        <Button as="div" labelPosition="left">
          <Label as="a" basic pointing="right">
            {product.price} DAI
          </Label>
          <Button icon>
            <Icon name="shop" />
            Buy
          </Button>
        </Button>
        <style jsx>{`
          .wrapper {
            text-align: center;
          }
          .product-image {
            width: 100%;
            max-width: 120px;
          }
          .title {
            margin: 18px;
            font-weight: 600;
            font-size: 18px;
          }
        `}</style>
      </div>
    );
  }
}
