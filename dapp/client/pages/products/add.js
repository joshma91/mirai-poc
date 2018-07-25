import Link from "next/link";
import { Segment, Header, Button, Input, Divider } from "semantic-ui-react";

import Layout from "../../components/Layout";

const reserveSlotStub = () =>
  new Promise(resolve => setTimeout(() => resolve("MY_BOOK_ID"), 500));

const uploadDataStub = () =>
  new Promise(resolve => setTimeout(() => resolve({ ok: true }), 500));

export default class AddProduct extends React.Component {
  state = {
    bookId: null,
    bookTitle: null,
    slotReserved: false,
    dataUploaded: false,
    reserveSlotLoading: false,
    dataUploadLoading: false
  };

  setBookTitle = e => this.setState({ bookTitle: e.target.value });

  reserveSlot = async () => {
    console.log("reserveSlot() called");

    this.setState({ reserveSlotLoading: true }, async () => {
      // TODO - replace with actual call to web3 to pay into contract
      const bookId = await reserveSlotStub();
      this.setState({
        bookId,
        slotReserved: true,
        reserveSlotLoading: false
      });
    });
  };

  uploadBookData = async () => {
    const { bookId, bookTitle } = this.state;
    const bookData = { id: bookId, title: bookTitle };

    console.log("uploadBookData() called");
    console.log("bookData", bookData);

    this.setState({ dataUploadLoading: true }, async () => {
      // TODO - make actual call to server to upload data
      const res = await uploadDataStub(bookData);
      if (res.ok) {
        this.setState({ dataUploaded: true, dataUploadLoading: false });
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
      dataUploadLoading
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
            <span style={{ color: "red" }}>
              https://miraimarket.com/8AmVkD7
            </span>
          </p>
        </Segment>
      </Layout>
    );
  }
}
