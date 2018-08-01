import Link from "next/link";
import { Image, Grid, Header, Button, List, Icon } from "semantic-ui-react";

import Layout from "../../components/Layout";
import ProductItem from "../../components/ProductItem";
import Web3Container from "../../lib/Web3Container";
import MiraiCoreJSON from "../../lib/contracts/MiraiCore.json";
import './app.css'

class BuyProducts extends React.Component {
  state = {
    productIds: []
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

    this.setState({ productIds });
  };

  render() {
    const { productIds } = this.state;
    const { accounts, contract } = this.props;
    return (
      <Layout>
        <Link href="/">
          <Button>Home</Button>
        </Link>

        <hr />

        <Header as="h1">Products</Header>
        <div className="wrapper">
          {productIds.map(id => (
            <ProductItem key={id} id={id} accounts={accounts} contract={contract} />
          ))}
        </div>
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
