import { Button } from "semantic-ui-react";
import getImage from "../lib/getImage";

const API_URL = "https://mirai-server.now.sh";

export default class BuyProductItem extends React.Component {
  state = { title: null, challenge: null, signature: null, imageURL: null };

  componentDidMount = async () => {
    const { id } = this.props;

    const title = await fetch(`${API_URL}/books?bookId=${id}`)
      .then(res => res.text())
      .then(text => JSON.parse(text).bookTitle)
      .catch(err => console.log(err));

    const imageURL = await getImage(id);
    this.setState({ imageURL, title });
  };

  retrieveResource = async () => {
    await this.getChallenge();
    await this.signChallenge();
  };

  getChallenge = async () => {
    const { accounts } = this.props;
    const res = await fetch(`${API_URL}/auth/${accounts[0].toLowerCase()}`);
    this.setState({ challenge: await res.json() });
  };

  signChallenge = async () => {
    const { web3, accounts } = this.props;
    const { challenge } = this.state;
    web3.currentProvider.sendAsync(
      {
        method: "eth_signTypedData",
        params: [challenge, accounts[0]],
        from: accounts[0]
      },
      async (error, res) => {
        if (error) return console.error(error);
        this.setState({ signature: res.result });
        const file = await this.verifySignature();
        window.open(file);
      }
    );
  };

  verifySignature = async () => {
    const { id } = this.props;
    const { challenge, signature } = this.state;
    const secret = await fetch(
      `${API_URL}/auth/${challenge[1].value}/${signature}?bookId=${id}`
    )
      .then(res => res.text())
      .then(text => {
        console.log(text);
        return JSON.parse(text);
      });
    return secret.bookURL;
  };

  render() {
    const { title, imageURL } = this.state;
    if (!imageURL) return null
    return (
      <div className="wrapper">
        <div className="image-wrapper">
          <img className="product-image" src={imageURL} />
        </div>
        <div className="title">{title}</div>
        <Button icon onClick={this.retrieveResource}>
          View Book
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
            padding-top:10px;
            padding-bottom: 10px;
            font-weight: 600;
            font-size: 18px;
          }
        `}</style>
      </div>
    );
  }
}
