import Link from 'next/link'
import { Modal, Header, Button, List, Icon } from 'semantic-ui-react'

import Layout from '../../components/Layout'

export default () => (
  <Layout>

    <Link href="/"><Button>Home</Button></Link>

    <hr/>

    <Header as="h1">My Products</Header>

    <p>You have not added any products, add one!</p>

    <Modal trigger={<Button>Add Product</Button>}>
      <Modal.Header>Add Product</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>We have found the following gravatar image associated with your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  </Layout>
)
