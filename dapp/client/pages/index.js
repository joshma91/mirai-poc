import Link from "next/link";
import {
  Modal,
  Header,
  Button,
  List,
  Icon,
  Form,
  RevealContent
} from "semantic-ui-react";
import FileUpload from "./fileUpload";
import ListProducts from "./listProducts";

import Layout from "../components/Layout";

export default class SellerPage extends React.Component {
  state = {
    showModal: false,
    myProducts: [],
    imageData: null,
    imagePreviewUrl: "",
    bookData: null
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.setState({
      myProducts: [
        ...this.state.myProducts,
        {
          imageData: this.state.imageData,
          imagePreviewUrl: this.state.imagePreviewUrl,
          bookData: this.state.bookData
        }
      ],
      showModal: false
    });
  };

  imageCallback = (imageData, imageUrl) => {
    this.setState({ imageData: imageData, imagePreviewUrl: imageUrl });
  };

  bookCallback = bookData => {
    this.setState({ bookData: bookData });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const options = [
      { key: "y", text: "Yes", value: "yes" },
      { key: "n", text: "No", value: "no" }
    ];
    return (
      <Layout>
        <Header as="h1">Home Page</Header>
        <Link href="/products/sell">
          <Button>Sell Products</Button>
        </Link>
        <Link href="/products/">
          <Button>Buy Products</Button>
        </Link>
        <hr />
        <Header as="h2">My Products</Header>
        <ListProducts products={this.state.myProducts} />
        <Modal
          open={this.state.showModal}
          onClose={this.closeModal}
          closeIcon
          trigger={
            <Button onClick={() => this.setState({ showModal: true })}>
              Add Product
            </Button>
          }
        >
          <Modal.Header>Add Product</Modal.Header>
          <Modal.Content image>
            <Form>
              <Form.Group>
                <FileUpload
                  isImage="true"
                  callbackFromParent={this.imageCallback}
                />
                <Form.Group width="equal">
                  <Form.Input
                    fluid
                    id="form-product-price"
                    label="Price (in Dai)"
                    placeholder="0"
                  />
                  <Form.Select
                    fluid
                    options={options}
                    label="Available"
                    placeholder="Available"
                  />
                </Form.Group>
              </Form.Group>
              <Form.Group>
                <FileUpload
                  isImage="false"
                  callbackFromParent={this.bookCallback}
                />
              </Form.Group>
              <Form.Button onClick={this.handleSubmit}>Add Product</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
        <List relaxed>
          <List.Item>
            <List.Content>
              <List.Header as="a">Next.js</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as="a">React</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as="a">Vue.js</List.Header>
            </List.Content>
          </List.Item>
        </List>
        Hello <Icon name="world" />
      </Layout>
    );
  }
}
