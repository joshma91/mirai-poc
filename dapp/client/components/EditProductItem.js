import {
  Image,
  Grid,
  Header,
  Button,
  List,
  Icon,
  Label,
  Input,
  Loader
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import getContract from "../lib/getContract";
import getImage from "../lib/getImage";

const API_URL = "https://mirai-server.now.sh/books";

export default class EditProductItem extends React.Component {
  state = { product: null, imageURL: null, newPrice: "", loading: false };

  componentDidMount = async () => {
    const { contract, accounts, id } = this.props;
    this.setState({ loading: true });
    const product = await contract.methods
      .getProductById(id)
      .call({ from: accounts[0] });

    const title = await fetch(`${API_URL}?bookId=${id}`)
      .then(res => res.text())
      .then(text => {
        if (text != "Not Found") return JSON.parse(text).bookTitle;
      });

    const updateProduct = title != undefined ? { ...product, title } : null;
    const imageURL = await getImage(id);

    this.setState({ product: updateProduct, imageURL, loading: false });
  };

  setNewPrice = e => this.setState({ newPrice: e.target.value });

  editPrice = async () => {
    const { product } = this.state;
    const { newPrice } = this.state;
    const { web3, accounts, id, contract } = this.props;

    const tx = await contract.methods
      .editProductPrice(product.owner, id, newPrice * 10 ** 18)
      .send({ from: accounts[0], gas: 3000000 })
      .on("receipt", function(receipt) {
        console.log(receipt.events.PriceChanged.returnValues.price);
      });
    const price = tx.events.PriceChanged.returnValues.price;

    this.setState({ product: { ...product, price } });
  };

  render() {
    const { product, imageURL, newPrice, loading } = this.state;
    if (loading) return <Loader active />;
    if (!product || !imageURL) return null;
    return (
      <div className="wrapper">
        <div className="image-wrapper">
          <img className="product-image" src={imageURL} />
        </div>

        <div className="title">{product.title}</div>
        <div className="sold">Number sold: {product.numberSold}</div>
        <Button as="div" labelPosition="left">
          <Label as="a" basic pointing="right">
            {product.price / 10 ** 18} ETH
          </Label>
          <Button icon onClick={this.editPrice}>
            <Icon name="edit outline" />
            Edit Price
          </Button>
          <Input
            value={newPrice}
            type="number"
            placeholder="0"
            onChange={this.setNewPrice}
            style={{ width: "75px" }}
          />
        </Button>
        <style jsx>{`
          .wrapper {
            text-align: center;
          }
          .product-image {
            width: 100%;
            max-height: 200px;
            max-width: 120px;
            border: slategray;
            border-style: double;
          }
          .image-wrapper {
            height: 200px;
          }
          .title {
            margin-top: 10px;
            font-weight: 600;
            font-size: 18px;
          }
          .sold {
            margin-bottom: 5px;
            font-size: 14px;
          }
        `}</style>
      </div>
    );
  }
}
