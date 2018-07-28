import Link from 'next/link'
import { Modal, Header, Button, List, Icon } from 'semantic-ui-react'

import Layout from '../../components/Layout'

export default () => (
  <Layout>

    <Link href="/"><Button>Home</Button></Link>

    <hr/>

    <Header as="h1">Products</Header>
  </Layout>
)
