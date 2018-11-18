import Link from "next/link";
import { Modal, Header, Button, List, Icon, Form } from "semantic-ui-react";

import Layout from "../../components/Layout";
import MenuBar from "../../components/MenuBar";
import MenuBarLayout from "../../components/MenuBarLayout";
import MiraiCoreJSON from "../../lib/contracts/MiraiCore.json";
import Web3Container from "../../lib/Web3Container"

class Sell extends React.Component {
  componentDidMount(){
    document.title = "Mirai - Sell"
  }

 render () {
   return(
    <MenuBarLayout accounts={this.props.accounts}>

    <Header as="h1">My Products</Header>

    <p>You have not added any products, add one!</p>

    <Link href="/products/add">
      <Button>Add Product</Button>
    </Link>
  </MenuBarLayout>
   )
 }
}

export default () => (
  <Web3Container
    contractJSON={MiraiCoreJSON}
    renderLoading={() =>  <Sell/>}
    render={({ web3, accounts, contract }) => (
      <Sell accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);
