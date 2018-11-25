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
import "../style.css";

const MetaMaskModal = () => (
  <Modal
    basic
    size={"tiny"}
    trigger={
      <Button className="metaBtn">
        Get Metamask{" "}
        <Image style={{ display: "inline-block" }} src="/static/metamask.png" />
      </Button>
    }
  >
    <Modal.Header
      className="modalHeader"
      style={{ fontSize: "1.6em", color: "#F0F2EB" }}
    >
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
              <h3 className="modalSubText">
                Click{" "}
                <a className="modalLink" href="https://metamask.io/">
                  here{" "}
                </a>
                to install
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
                content="Connect to the Ropsten Ethereum network"
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
  renderWelcome = () => {
    const { accounts, contract } = this.props;

    if (contract == undefined) {
      return <MetaMaskModal />;
    } else if (accounts && accounts.length == 0) {
      return (
        <div>
          {" "}
          <strong>Please unlock your Metamask account! </strong>
          <Image
            style={{ display: "inline-block" }}
            src="/static/metamask.png"
          />
        </div>
      );
    } else {
      return (
        <div>
          {" "}
          Welcome, <strong>{this.props.accounts}</strong>!
        </div>
      );
    }
  };

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
            backgroundColor: "white",
            padding: "12px",
            margin: "0px"
          }}
          size="large"
        >
          <Container>
            <Menu.Item style={{ borderLeft: "0px" }}>
              <a className="logo" href={"/"}>
                Mirai
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                className="menuItem"
                href="/products/sell"
              >
                My Bookstore
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                className="menuItem"
                href="/products/buy"
              >
                Buy Books
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                className="menuItem"
                style={{
                  borderRight:"0px"
                }}
                href="/products/view"
              >
                My Purchases
              </a>
            </Menu.Item>
            <Menu.Item style={{borderLeft:"0px"}} position="right">{this.renderWelcome()}</Menu.Item>
          </Container>
        </Menu>
      </Segment>
    );
  }
}
