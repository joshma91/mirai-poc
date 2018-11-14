import MenuBar from "./MenuBar";
import Layout from "./Layout";
import { Container } from "semantic-ui-react";

const MenuBarLayout = ({ children }) => (
  <div style={{backgroundColor:"#EFEEE9", height:"-webkit-fill-available"}}>
    <MenuBar />
    <Layout> {children}</Layout>;
  </div>
);


export default MenuBarLayout