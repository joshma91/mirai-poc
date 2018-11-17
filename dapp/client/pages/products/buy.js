import Link from "next/link";
import { Image, Grid, Header, Button, List, Icon } from "semantic-ui-react";

import Layout from "../../components/Layout";
import BuyProductItem from "../../components/BuyProductItem";
import Web3Container from "../../lib/Web3Container";
import MiraiCoreJSON from "../../lib/contracts/MiraiCore.json";
import MenuBarLayout from "../../components/MenuBarLayout";

class BuyProducts extends React.Component {
  state = { productIds: null };
  componentDidMount = async () => {
    const { accounts, contract } = this.props;
    document.title = "Mirai - Buy"
    const allProducts = await contract.methods
      .getAvailableProductIds()
      .call({ from: accounts[0] });

    this.setState({ productIds: allProducts.filter(x => x !== "-1") });
  };

  renderProducts() {
    const { productIds } = this.state;
    const { web3, accounts, contract } = this.props;
    if (productIds.length === 0) return <div>No Items Found</div>;
    return (
      <div className="wrapper">
        {productIds.map(id => (
          <BuyProductItem
            key={id}
            id={id}
            web3={web3}
            accounts={accounts}
            contract={contract}
          />
        ))}
        <style jsx>{`
          .wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 40px;
          }
        `}</style>
      </div>
    );
  }

  render() {
    const { productIds } = this.state;
    return (
      <MenuBarLayout accounts={this.props.accounts}>
        <Header as="h1">Products</Header>
        {productIds ? this.renderProducts() : "Loading..."}
      </MenuBarLayout>
    );
  }
}

export default () => (
  <Web3Container
    contractJSON={MiraiCoreJSON}
    renderLoading={() => <BuyProducts/>}
    render={({ web3, accounts, contract }) => (
      <BuyProducts accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);
