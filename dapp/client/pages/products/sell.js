import Link from "next/link";
import {
  Modal,
  Header,
  Button,
  List,
  Icon,
  Form,
  Loader
} from "semantic-ui-react";
import MenuBarLayout from "../../components/MenuBarLayout";
import MiraiCoreJSON from "../../lib/contracts/MiraiCore.json";
import EditProductItem from "../../components/EditProductItem";
import Web3Container from "../../lib/Web3Container";

class Sell extends React.Component {
  state = { productIds: null };

  componentDidMount = async () => {
    const { accounts, contract } = this.props;
    document.title = "Mirai - Sell";

    const productIds = await contract.methods
      .getProductIdsByOwner(accounts[0])
      .call({ from: accounts[0], gas: 3000000 });
    this.setState({ productIds });
  };
  renderProducts = () => {
    const { productIds } = this.state;
    const { web3, accounts, contract } = this.props;

    return (
      <div className="wrapper">
        {productIds.map(id => (
          <EditProductItem contract={contract} key={id} id={id} web3={web3} accounts={accounts} />
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
  };

  render() {
    const { productIds } = this.state;
    console.log(productIds);
    return (
      <MenuBarLayout accounts={this.props.accounts} contract={this.props.contract}>
        <Header as="h1">My Bookstore</Header>

        {productIds && productIds.length > 0 ? (
          <div>
            <Link href="/products/add">
              <Button className="primaryBtn margin30">Add a Book</Button>
            </Link>

            {this.renderProducts()}
          </div>
        ) : (
          <div>
            <p>You have not added any products, add one!</p>
            <Link href="/products/add">
              <Button className="primaryBtn margin30">Add a Book</Button>
            </Link>
          </div>
        )}
      </MenuBarLayout>
    );
  }
}

export default () => (
  <Web3Container
    contractJSON={MiraiCoreJSON}
    renderLoading={() => (
      <MenuBarLayout>
        <Header as="h1">My Bookstore</Header>
        <Loader active />
      </MenuBarLayout>
    )}
    render={({ web3, accounts, contract }) => (
      <Sell accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);
