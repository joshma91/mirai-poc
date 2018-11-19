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

const API_URL = "http://localhost:5678/books";

export default class EditProductItem extends React.Component {
  state = { product: null, imageURL: null, newPrice: "", ethUSD: "" };

  componentDidMount = async () => {
    const { contract, accounts, id } = this.props;
    const product = await contract.methods
      .getProductById(id)
      .call({ from: accounts[0] });

    const title = await fetch(`${API_URL}?bookId=${id}`)
      .then(res => res.text())
      .then(text => {
        if (text != "Not Found") return JSON.parse(text).bookTitle;
      });

    if (title != undefined) {
      this.setState({ product: { ...product, title } });
    }
    const imageURL = await getImage(id);
    if (imageURL != undefined) {
      this.setState({ imageURL });
    }

    const ethUSD = await fetch("https://api.coinmarketcap.com/v2/ticker/1027/")
      .then(x => x.json())
      .then(x => x.data.quotes.USD.price);
    this.setState({ ethUSD });
  };

  setNewPrice = e => this.setState({ newPrice: e.target.value });

  editPrice = async () => {
    const { price, owner } = this.state.product;
    const { web3, accounts, id, contract } = this.props;

    await contract.methods
      .editProductPrice(owner, id, newPrice)
      .send({ from: accounts[0], gas: 3000000 })
      .on("receipt", function(receipt) {
        console.log(receipt.events.PriceChanged.returnValues);
      });
  };

  render() {
    const { product, imageURL, newPrice, ethUSD } = this.state;
    if (!product) return null;
    return (
      <div className="wrapper">
        {imageURL ? (
          <img className="product-image" src={imageURL} />
        ) : (
          <img
            className="product-image"
            src={`http://www.placecage.com/200/30${this.props.id}`}
          />
        )}
        <div className="title">{product.title}</div>
        <Button as="div" labelPosition="left">
          <Label as="a" basic pointing="right">
            {product.price} ETH
          </Label>
          <Button icon onClick={this.editPrice}>
            <Icon name="edit outline" />
            Edit Price
          </Button>
          <Input value={newPrice} type="number" placeholder="0" onChange={this.setNewPrice} style={{ width: "75px" }} />
        </Button>  <span >{(newPrice && ('= ' + parseFloat(ethUSD*newPrice).toFixed(2)) + '  USD')}</span>
        <style jsx>{`
          .wrapper {
            text-align: center;
          }
          .product-image {
            width: 100%;
            max-height: 200px;
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
