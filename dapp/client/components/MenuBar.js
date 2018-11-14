import { Container, Image, Button, Menu, Segment, Link } from "semantic-ui-react";
import logo from "../mirai.svg";
import "../style.css";

const MenuBar = ({ children }) => (
  <Segment
    inverted
    textAlign="center"
    style={{
      backgroundColor: "white",
      padding: "0em 0em",
      position: "relative"
    }}
    vertical
  >

    <Menu
      style={{
        backgroundColor: "#ffec6d",
        padding: "12px",
        margin: "0px"
      }}
      size="large"
    >
      <Container>

        <Image src={logo} size="tiny" href={"/"} />
        <Menu.Item>
          <a
            style={{
              fontSize: "large",
              fontWeight: "bold",
              color: "darkslategrey"
            }}
            href="../products/sell"
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
            href="../products/buy"
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
            href="../products/view"
          >
            View My Products
          </a>
        </Menu.Item>
        <Menu.Item position="right">
          <Button as="a">Log in</Button>
          <Button as="a" style={{ marginLeft: "0.5em" }}>
            Sign Up
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  </Segment>
);

export default MenuBar;
