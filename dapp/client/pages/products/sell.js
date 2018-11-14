import Link from "next/link";
import { Modal, Header, Button, List, Icon, Form } from "semantic-ui-react";

import Layout from "../../components/Layout";
import MenuBar from "../../components/MenuBar";
import MenuBarLayout from "../../components/MenuBarLayout";

export default () => (
  <MenuBarLayout>

    <Header as="h1">My Products</Header>

    <p>You have not added any products, add one!</p>

    <Link href="/products/add">
      <Button>Add Product</Button>
    </Link>
  </MenuBarLayout>
);
