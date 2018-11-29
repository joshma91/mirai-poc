import MenuBar from "./MenuBar";
import { Container } from "semantic-ui-react";

export default class MenuBarLayout extends React.Component {
 
 render() {
  const {small} = this.props
  return (
    <div style={{overflow: "scroll", backgroundColor:"#F0F2EB", height:"-webkit-fill-available"}}>
    <MenuBar accounts={this.props.accounts} contract={this.props.contract}/>
    <Layout small={small ? true: false}> {this.props.children}</Layout>;
  </div>
  )
 } 
}

const Layout = ({ small, children }) => (
  <Container style={{ width: small ? "800px" : "", paddingTop: "4em", paddingBottom: "7em" }}>{children}</Container>
);
