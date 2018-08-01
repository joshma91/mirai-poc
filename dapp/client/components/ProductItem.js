import { Image, Grid, Header, Button, List, Icon } from "semantic-ui-react";
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
    return product ? (
      <Grid columns={2} verticalAlign="bottom">
        <Grid.Row>
          <Grid.Column>
            <Image src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" />
          </Grid.Column>
          <Grid.Column>
            <Grid.Row> Title: {product.title} </Grid.Row>
            <Grid.Row> Price: {product.price}</Grid.Row>
            <Grid.Row>
              <Button>Buy!</Button>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <div />
    );
  }
}
