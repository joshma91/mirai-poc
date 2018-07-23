import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

const FixedMenuLayout = ({ children }) => (
  <Container style={{ paddingTop: '7em' }}>
    { children }
  </Container>
)

export default FixedMenuLayout