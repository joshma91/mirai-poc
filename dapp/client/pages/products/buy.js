import Link from "next/link";
import { Image, Grid, Header, Button, List, Icon } from "semantic-ui-react";

import Layout from "../../components/Layout";
import Web3Container from "../../lib/Web3Container";
import MiraiCoreJSON from "../../lib/contracts/MiraiCore.json";

const API_URL = "http://localhost:5678/books";

class BuyProducts extends React.Component {
  state = {
    productIds: [],
    products: []
  };

  componentDidMount = async () => {
    const { accounts, contract } = this.props;

    // get list of all available products
    const rawProductIds = await contract.methods
      .getAvailableProductIds()
      .call({ from: accounts[0] });
    const productIds = rawProductIds.filter(function(x, i) {
      return i > 0 ? x != 0 : true;
    });

    const productsNoTitle = await this.retrieveProductsFromBlockchain(
      productIds
    );
    const addTitlePromise = productsNoTitle.map(x => {
      return fetch(`${API_URL}?bookId=${x.id}`)
        .then(res => res.text())
        .then(text => {
          x.title = JSON.parse(text).bookTitle;
          return x;
        });
    });

    const products = await Promise.all(addTitlePromise);
    console.log(products);
    this.setState({ productIds, products });
  };

  displayProducts = () => {
    const { productIds } = this.state;
    let content = [];

    productIds.forEach((id, i) => {
      if (i % 3 == 0) {
        content.push(
          <Grid.Row>
            <Grid.Column key={i}>{this.showProductId(i)}</Grid.Column>
            {productIds[i + 1] ? (
              <Grid.Column key={i + 1}>{this.showProductId(i + 1)}</Grid.Column>
            ) : null}
            {productIds[i + 2] ? (
              <Grid.Column key={i + 2}>{this.showProductId(i + 2)}</Grid.Column>
            ) : null}
          </Grid.Row>
        );
      }
    });
    return content;
  };

  showProductId = i => {
    const { products } = this.state;
    return (
      <Grid columns={2} verticalAlign='bottom'>
        <Grid.Row>
          <Grid.Column>
            <Image src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" />
          </Grid.Column>
          <Grid.Column>
            <Grid.Row> Title: {products[i].title}</Grid.Row>
            <Grid.Row> Price: {products[i].price} </Grid.Row>
            <Grid.Row>
              <Button>Buy!</Button>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  retrieveProductsFromBlockchain = async productIds => {
    const { contract, accounts } = this.props;
    const allProductsPromise = productIds.map(x => {
      return contract.methods.getProductById(x).call({ from: accounts[0] });
    });
    const products = await Promise.all(allProductsPromise);
    return products;
  };

  render() {
    const { productIds } = this.state;
    return (
      <Layout>
        <Link href="/">
          <Button>Home</Button>
        </Link>

        <hr />

        <Header as="h1">Products</Header>
        <Grid columns={3} divided>
          {this.displayProducts()}
        </Grid>
      </Layout>
    );
  }
}

export default () => (
  <Web3Container
    contractJSON={MiraiCoreJSON}
    renderLoading={() => <div>Loading Page...</div>}
    render={({ web3, accounts, contract }) => (
      <BuyProducts accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);
