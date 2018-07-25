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

import Layout from "../components/Layout";
import FileUpload from "../components/fileUpload";
import ListProducts from "../components/listProducts";

export default () => (
  <Layout>
    <Header as="h1">Home Page</Header>
    <Link href="/products/sell">
      <Button>Sell Products</Button>
    </Link>
    <Link href="/products/">
      <Button>Buy Products</Button>
    </Link>
  </Layout>
);
