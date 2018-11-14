import Link from "next/link";
import { Header, Button } from "semantic-ui-react";

import Layout from "../../components/Layout";
import Web3Container from "../../lib/Web3Container";
import MiraiOwnershipJSON from "../../lib/contracts/MiraiOwnership.json";
import ViewProductItem from "../../components/ViewProductItem";
import MenuBarLayout from "../../components/MenuBarLayout";

class ViewProducts extends React.Component {
  state = { productIds: null };

  componentDidMount = async () => {
    const { accounts, contract } = this.props;

    const tokenIds = await contract.methods
      .getTokensByOwner(accounts[0])
      .call({ from: accounts[0], gas: 3000000 });

    const productIds = await this.getProductIdsFromTokens(tokenIds);

    this.setState({ productIds });
  };

  getProductIdsFromTokens = async tokenIds => {
    const { accounts, contract } = this.props;
    const idPromises = tokenIds.map(id => {
      return contract.methods.tokenURI(id).call({ from: accounts[0], gas: 3000000 });
    });
    const productIds = await Promise.all(idPromises);

    // filter out duplicates. Can be enforced on the blockchain side but takes more work
    return [...new Set(productIds)];
  };

  renderProducts() {
    const { productIds } = this.state;
    const { web3, accounts } = this.props

    if (productIds.length === 0) return <div>No Items Found</div>;
    return (
      <div className="wrapper">
        {productIds.map(id => (
          <ViewProductItem
            key={id}
            id={id}
            web3={web3}
            accounts={accounts}
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
      <MenuBarLayout>
        <Header as="h1">My Products</Header>
        {productIds ? this.renderProducts() : "Loading..."}
      </MenuBarLayout>
    );
  }
}

export default () => (
  <Web3Container
    contractJSON={MiraiOwnershipJSON}
    renderLoading={() => <div>Loading Page...</div>}
    render={({ web3, accounts, contract }) => (
      <ViewProducts accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);
