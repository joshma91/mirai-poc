import Link from "next/link";
import {
  Segment,
  Header,
  Button,
  Input,
  Divider,
  Form
} from "semantic-ui-react";

import Layout from "../../components/Layout";
import Web3Container from "../../lib/Web3Container";
import MiraiCoreJSON from "../../lib/contracts/MiraiCore.json";

const API_URL = "https://mirai-poc.firebaseapp.com/books";

class AddProduct extends React.Component {
  state = {
    bookId: null,
    bookTitle: "",
    bookPrice: "",
    bookAvailable: true,
    slotReserved: false,
    dataUploaded: false,
    reserveSlotLoading: false,
    dataUploadLoading: false,
    bookURL: null
  };

  setBookTitle = e => this.setState({ bookTitle: e.target.value });

  setBookPrice = e => this.setState({ bookPrice: e.target.value });

  setAvailable = e => this.setState({ bookAvailable: e.target.value });

  uploadDataStub = async () => {
    const { bookId, bookTitle } = this.state;
    const response = await fetch(API_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: bookId,
        bookTitle: bookTitle,
        secret: `SECRET RESROUCE #${bookId}`
      })
    });
    return response;
  };

  getBookTitle = async () =>
    await fetch(`${API_URL}?bookId=${this.state.bookId}`);

  reserveSlot = async () => {
    console.log("reserveSlot() called");

    const { bookPrice, bookAvailable } = this.state;

    this.setState({ reserveSlotLoading: true }, async () => {
      const { accounts, contract } = this.props;
      let retrievedId;

      await contract.methods
        .createProduct(bookPrice, accounts[0], bookAvailable)
        .send({ from: accounts[0], gas: 3000000 })
        .on("receipt", function(receipt) {
          retrievedId = receipt.events.ProductCreated.returnValues.id;
        });

      this.setState({
        bookId: retrievedId,
        slotReserved: true,
        reserveSlotLoading: false
      });

      console.log("bookId:", this.state.bookId);
    });
  };

  uploadBookData = async () => {
    const { bookId, bookTitle } = this.state;

    this.setState({ dataUploadLoading: true }, async () => {
      // TODO - make actual call to server to upload data
      const res = await this.uploadDataStub();
      if (res.status != 200) throw Error(body.message);
      const storedBook = await this.getBookTitle(this.state.bookId);
      if (res.ok) {
        this.setState({
          dataUploaded: true,
          dataUploadLoading: false,
          bookURL: `www.miraimarket.com/${bookId}_${bookTitle}`
        });
      } else {
        alert("Uh oh, something bad happened.");
      }
    });
  };

  render() {
    const {
      slotReserved,
      dataUploaded,
      reserveSlotLoading,
      dataUploadLoading,
      bookURL
    } = this.state;
    const showStage1 = slotReserved === false;
    const showStage2 = slotReserved && !dataUploaded;
    const showStage3 = slotReserved && dataUploaded;
    return (
      <Layout>
        <Link href="/">
          <Button>Home</Button>
        </Link>

        <hr />

        <Header as="h1">Add Product</Header>

        <Segment disabled={!showStage1}>
          <Header as="h2">1. Reserve a slot for your book</Header>
          <p>
            In order to upload your book, you must first reserve your slot on
            the blockchain by paying into the contract.
          </p>
          <p>The current cost for one product upload is: 1 MRI</p>
          <Form>
            <Form.Input
              label="Price"
              type="number"
              value={this.state.bookPrice}
              onChange={this.setBookPrice}
              disabled={!showStage1}
            />
            <Form.Checkbox
              label="Make this product available"
              defaultChecked
              onChange={this.setAvailable}
              disabled={!showStage1}
            />
          </Form>
          <Divider hidden />

          <Button
            onClick={this.reserveSlot}
            loading={reserveSlotLoading}
            disabled={!showStage1}
          >
            Reserve
          </Button>
        </Segment>

        <Segment disabled={!showStage2}>
          <Header as="h2">2. Upload your book and metadata</Header>
          <p>
            Now that you own an open slot on the marketplace, it's time to
            upload your book and metadata!
          </p>
          <Input
            label="Title"
            value={this.state.bookTitle}
            onChange={this.setBookTitle}
            disabled={!showStage2}
          />
          <Divider hidden />
          <Button
            onClick={this.uploadBookData}
            loading={dataUploadLoading}
            disabled={!showStage2}
          >
            Upload
          </Button>
        </Segment>

        <Segment disabled={!showStage3}>
          <Header as="h2">3. Complete!</Header>
          <p>
            Your book has been uploaded and is now on the Mirai Marketplace!
          </p>
          <p>
            Here is the link to your book:{" "}
            <span style={{ color: "red" }}>{bookURL}</span>
          </p>
        </Segment>
      </Layout>
    );
  }
}

export default () => (
  <Web3Container
    contractJSON={MiraiCoreJSON}
    renderLoading={() => <div>Loading Page...</div>}
    render={({ web3, accounts, contract }) => (
      <AddProduct accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);
