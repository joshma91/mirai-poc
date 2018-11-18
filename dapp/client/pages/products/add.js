import Link from "next/link";
import {
  Segment,
  Header,
  Button,
  Input,
  Divider,
  Form,
  Grid
} from "semantic-ui-react";
import Dropzone from "react-dropzone";

import Layout from "../../components/Layout";
import Web3Container from "../../lib/Web3Container";
import MiraiCoreJSON from "../../lib/contracts/MiraiCore.json";
import { resolve } from "url";
import MenuBarLayout from "../../components/MenuBarLayout";
import ImageUpload from "../../components/ImageUpload";
import "../../style.css";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const dropzone = {
  width: "200px",
  height: "100px",
  textAlign: "center",
  borderColor: "rgb(86, 155, 183)",
  borderWidth: "1px",
  borderStyle: "dashed",
  borderRadius: "5px",
  paddingTop: "10px"
};

const API_URL = "https://mirai-server.now.sh/books";

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
    bookURL: null,
    bookFile: null,
    bookImage: []
  };
  componentDidMount() {
    document.title = "Mirai - Add a Product";
  }

  setBookTitle = e => this.setState({ bookTitle: e.target.value });

  setBookPrice = e => this.setState({ bookPrice: e.target.value });

  setAvailable = e => this.setState({ bookAvailable: e.target.value });

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ bookFile: acceptedFiles[0] });
  };

  imgOnDrop(files) {
    this.setState({
      bookImage: files.map(file => ({
        file: file,
        preview: URL.createObjectURL(file)
      }))
    });
  }

  uploadDataStub = async () => {
    const { bookId, bookTitle, bookImage } = this.state;
    const formData = new FormData();
    formData.append("bookId", bookId)
    formData.append("bookTitle", bookTitle)
    formData.append("bookImage", bookImage[0].file)
    formData.append("secret", "secre1t")
    const response = await fetch(API_URL, {
      method: "post",
      body: formData
    });
    if (response.status != 200) throw Error(response.message);
    const text = await response.text();
    return JSON.parse(text).signedUrl;
  };

  uploadBookFile = signedUrl => {
    return new Promise((resolve, reject) => {
      const { bookFile } = this.state;
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", signedUrl, true);
      xhr.onload = e => {
        console.log("File upload successful");
        resolve(xhr);
      };
      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          console.log((e.loaded / e.total) * 100);
        }
      };

      xhr.send(bookFile);
    });
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
      const signedUrl = await this.uploadDataStub();
      const res = await this.uploadBookFile(signedUrl);
      if (res.status == 200) {
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
      bookURL,
      bookFile,
      bookImage
    } = this.state;

    const thumbs = bookImage.map(file => (
      <div style={thumb}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));

    const showStage1 = slotReserved === false;
    const showStage2 = slotReserved && !dataUploaded;
    const showStage3 = slotReserved && dataUploaded;
    return (
      <MenuBarLayout accounts={this.props.accounts}>
        <Header as="h1">Add Product</Header>

        <Segment disabled={!showStage1}>
          <Header as="h2">1. Reserve a slot for your book</Header>
          <p>
            In order to upload your book, you must first reserve your slot on
            the blockchain by paying into the contract.
          </p>
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
          <br />
          <Grid columns={2} style={{ margin: "0px", width: "60%" }}>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" content="Upload Book" />
              </Grid.Column>
              <Grid.Column>
                <Header as="h3" content="Upload Book Cover" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Dropzone
                  onDrop={this.onDrop}
                  accept="application/pdf"
                  disabled={!showStage2}
                  multiple={false}
                  style={dropzone}
                >
                  Drop your book here or click to upload. Only PDFs
                </Dropzone>
              </Grid.Column>
              <Grid.Column>
                <Dropzone
                  accept="image/*"
                  onDrop={this.imgOnDrop.bind(this)}
                  multiple={false}
                  disabled={!showStage2}
                  style={dropzone}>
                  Drop your book cover here or click to upload. Only images
                  </Dropzone>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              <aside>
                
                {bookFile && (
                  <div>
                  <h3>Dropped file</h3>
                  <ul>
                    <li key={bookFile.name}>
                      {bookFile.name} - {bookFile.size/1000000} MB
                    </li>
                  </ul>
                  </div>
                )}
              </aside>
              </Grid.Column>
              <Grid.Column>
              <aside style={thumbsContainer}>{thumbs}</aside>
                </Grid.Column>
            </Grid.Row>
          </Grid>
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
      </MenuBarLayout>
    );
  }
}

export default () => (
  <Web3Container
    contractJSON={MiraiCoreJSON}
    renderLoading={() => <AddProduct />}
    render={({ web3, accounts, contract }) => (
      <AddProduct accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);
