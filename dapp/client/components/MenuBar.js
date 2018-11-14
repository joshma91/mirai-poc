import { Container, Image, Button, Menu } from "semantic-ui-react";
import logo from "../mirai.svg"

const MenuBar = ({ children }) => (
  <Container>
    <Image src={logo} height="75px" style={{ left: "-50px" }} />
    <Menu.Item>
      <a
        style={{
          fontSize: "large",
          fontWeight: "bold",
          color: "darkslategrey"
        }}
        href="../pages/products/sell"
      >
        Sell Products
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        style={{
          fontSize: "large",
          fontWeight: "bold",
          color: "darkslategrey"
        }}
        href="../pages/products/buy"
      >
        Buy Products
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        style={{
          fontSize: "large",
          fontWeight: "bold",
          color: "darkslategrey"
        }}
        href="../pages/products/view"
      >
        View My Products
      </a>
    </Menu.Item>
    <Menu.Item position="right">
      <Button as="a">
        Log in
      </Button>
      <Button
        as="a"
        style={{ marginLeft: "0.5em" }}
      >
        Sign Up
      </Button>
    </Menu.Item>
  </Container>
);

export default MenuBar;
