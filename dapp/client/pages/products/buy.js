import Link from "next/link";
import {
  Image,
  Grid,
  Header,
  Button,
  List,
  Icon,
  Loader
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../components/Layout";
import getContract from '../../lib/getContract'
import MiraiOwnershipJSON from "../../lib/contracts/MiraiOwnership.json";
import BuyProductItem from "../../components/BuyProductItem";
import Web3Container from "../../lib/Web3Container";
import MiraiCoreJSON from "../../lib/contracts/MiraiCore.json";
import MenuBarLayout from "../../components/MenuBarLayout";

class BuyProducts extends React.Component {
  state = { productIds: null, ownedProductIds: null };

  componentDidMount = async () => {
    const { accounts, contract, web3} = this.props;
    document.title = "Mirai - Buy";
    const allProducts = await contract.methods
      .getAvailableProductIds()
      .call({ from: accounts[0] });

    const ownershipContract = await getContract(web3, MiraiOwnershipJSON);

    const ownedTokenIDs = await ownershipContract.methods
      .getTokensByOwner(accounts[0])
      .call({ from: accounts[0], gas: 3000000 });

    const ownedProductIds = await this.getProductIdsFromTokens(ownedTokenIDs, ownershipContract);

    this.setState({ productIds: allProducts.filter(x => x !== "-1"), ownedProductIds });
  };

  getProductIdsFromTokens = async (tokenIds, ownershipContract) => {
    const { accounts } = this.props;
    const idPromises = tokenIds.map(id => {
      return ownershipContract.methods.tokenURI(id).call({ from: accounts[0], gas: 3000000 });
    });
    const productIds = await Promise.all(idPromises);
   

    // filter out duplicates. Can be enforced on the blockchain side but takes more work
    return [...new Set(productIds)];
  };

  renderProducts() {
    const { productIds, ownedProductIds } = this.state;
    const { web3, accounts, contract } = this.props;
    if (productIds.length === 0) return <div>No Items Found</div>;
    return (
      <div className="wrapper">
        {productIds.map(id => (
          <BuyProductItem
            key={id}
            id={id}
            ownedProductIds={ownedProductIds}
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
      <MenuBarLayout accounts={this.props.accounts} contract={this.props.contract}>
        <Header as="h1">Buy Books</Header>
        {productIds ? this.renderProducts() : <Loader active />}
      </MenuBarLayout>
    );
  }
}

export default () => (
  <Web3Container
    contractJSON={MiraiCoreJSON}
    renderLoading={() => (
      <MenuBarLayout>
        <Header as="h1">Buy Books</Header>
        <Loader active />
      </MenuBarLayout>
    )}
    render={({ web3, accounts, contract }) => (
      <BuyProducts accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);
