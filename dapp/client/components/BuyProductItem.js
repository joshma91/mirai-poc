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

import getContract from "../lib/getContract";
import MiraiOwnershipJSON from "../lib/contracts/MiraiOwnership.json";
import getImage from "../lib/getImage"

const API_URL = "http://localhost:5678/books";

export default class BuyProductItem extends React.Component {
  state = { product: null, imageURL: null };

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
    const imageURL = await getImage(id)
    if (imageURL != undefined) {
      this.setState({ imageURL });
    }
  };

  requestPOP = async () => {
    const { price, owner } = this.state.product;
    const { web3, accounts, id } = this.props;
    const ownershipContract = await getContract(web3, MiraiOwnershipJSON);

    await ownershipContract.methods
      .buyPOP(id.toString(), owner)
      .send({value: price*1000000000000000000, from: accounts[0], gas: 3000000 })
      .on("receipt", function(receipt) {
        console.log(receipt.events.POPIssued.returnValues);
      });
  };

  render() {
    const { product, imageURL } = this.state;
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
          <Button icon onClick={this.requestPOP}>
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
            max-height:200px;
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
