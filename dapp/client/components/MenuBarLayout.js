import MenuBar from "./MenuBar";
import Layout from "./Layout";
import { Container } from "semantic-ui-react";

export default class MenuBarLayout extends React.Component {
 
 render() {
  return (
    <div style={{overflow: "scroll", backgroundColor:"#EFEEE9", height:"-webkit-fill-available"}}>
    <MenuBar accounts={this.props.accounts}/>
    <Layout> {this.props.children}</Layout>;
  </div>
  )
 }
}