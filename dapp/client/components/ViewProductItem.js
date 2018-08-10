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

export default class BuyProductItem extends React.Component {
  state = { title: null };

  componentDidMount = async () => {
    const { id } = this.props;

    const title = await fetch(`${API_URL}?bookId=${id}`)
      .then(res => res.text())
      .then(text => JSON.parse(text).bookTitle);

    this.setState({ title });
  };

  render() {
    const {title} = this.state
    return (
      <div className="wrapper">
        <img
          className="product-image"
          src={`http://www.placecage.com/200/30${this.props.id}`}
          alt=""
        />
        <div className="title">{title}</div>
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
