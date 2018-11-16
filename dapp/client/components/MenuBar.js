import {
  Container,
  Image,
  Button,
  Menu,
  Segment,
  Link,
  Header,
  Modal
} from "semantic-ui-react";
import logo from "../mirai.svg";
import "../style.css";

const MetaMaskModal = () => (
  <Modal
    trigger={
      <Button style={{color:"#EFEEE9",backgroundColor:"#6b7f87"}}>
        Get Metamask  <Image style={{display:"inline-block"}} src="/static/metamask.png" />
      </Button>
    }
  >
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
        src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
      />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>
          We've found the following gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default class MenuBar extends React.Component {
  render() {
    return (
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
              {this.props.accounts == undefined ? (
                <MetaMaskModal />
              ) : (
                <div>
                  {" "}
                  Welcome, <strong>{this.props.accounts}</strong>!
                </div>
              )}
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    );
  }
}
