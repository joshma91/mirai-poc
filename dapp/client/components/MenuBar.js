import {
  Container,
  Image,
  Button,
  Menu,
  Segment,
  Header,
  Modal,
  Grid
} from "semantic-ui-react";
import logo from "../static/mirai.svg";
import "../style.css";

const MetaMaskModal = () => (
  <Modal basic
    size={"tiny"}
    trigger={
      <Button style={{ color: "#EFEEE9 !important", backgroundColor: "#6b7f87" }}>
        Get Metamask{" "}
        <Image style={{ display: "inline-block" }} src="/static/metamask.png" />
      </Button>
    }
  >
    <Modal.Header style={{ fontSize:"1.6em", color: "#EFEEE9"}}>
    <Image
        style={{
          display: "-webkit-inline-box",
          margin: "-10px",
          paddingRight:"20px",
          textAlign: "center"
        }}
        size="tiny"
        src={logo}
      />
      Welcome! Let's get you set up to use Mirai{" "}
    </Modal.Header>
    <Modal.Content image style={{ paddingLeft: "60px" }}>
      <Modal.Description>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header
                as="h2"
                content="Install and Setup MetaMask"
                className="modalText"
                style={{ color: "#00B6E4", marginBottom: "-20px" }}
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                style={{ display: "inline-block" }}
                src="/static/metamask.png"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <h3 style={{ color: "#00B6E4"}}>
              Click <a href="https://metamask.io/">here </a>to install
            </h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header
                as="h2"
                content="Unlock your MetaMask"
                className="modalText"
                style={{ color: "#00B6E4", marginBottom: "-20px" }}
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                style={{ display: "inline-block" }}
                src="/static/metamask.png"
              />
            </Grid.Column>
          </Grid.Row>

        </Grid>

         <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header
                as="h2"
                content="Connect to the Kovan Ethereum network"
                className="modalText"
                style={{ color: "#00B6E4" }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Modal.Description>
    </Modal.Content>
    <div />
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
