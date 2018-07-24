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
import ImageUpload from "./imageUpload";

import Layout from "../components/Layout";

const options = [
  { key: "y", text: "Yes", value: "yes" },
  { key: "n", text: "No", value: "no" }
];

export default () => (
  <Layout>
    <Header as="h1">Home Page</Header>
    <Link href="/products/sell">
      <Button>Sell Products</Button>
    </Link>
    <Link href="/products/">
      <Button>Buy Products</Button>
    </Link>
    <hr />
    <Header as="h2">Example Semantic-UI elements</Header>
    <Modal trigger={<Button>Show Modal</Button>}>
      <Modal.Header>Add Product</Modal.Header>
      <Modal.Content image>
        <Form>
          <Form.Group>
            <ImageUpload imgPlaceholder="true" label="Book Cover" width/>
            <Form.Input
              id="form-product-price"
              label="Price (in Dai)"
              placeholder="0"
            />
            <Form.Select
              options={options}
              label="Available"
              placeholder="Available"
            />
          </Form.Group>
          <ImageUpload imgPlaceholder="false" />
          <Form.Button>Submit</Form.Button>
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
