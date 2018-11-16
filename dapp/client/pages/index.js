import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import MenuBar from "../components/MenuBar"
import logo from "../mirai.svg"
import "../style.css";
import Web3Container from "../lib/Web3Container"
import MiraiCoreJSON from "../lib/contracts/MiraiCore.json";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container className="overlay">
    <Header
      as="h1"
      content="Mirai"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        marginBottom: 0,
        paddingTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="Buy and sell books on the Blockchain."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Button style={{color:"darkslategrey", backgroundColor:"#ffec6d"}} size="huge">
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class HomePage extends Component {
  render() {
    const { web3, accounts, contract} = this.props

    return (
      <Responsive>
        <Visibility style={{backgroundColor:"#EFEEE9", height:"-webkit-fill-available"}}>
           <MenuBar accounts={accounts}/>
          <video loop autoPlay muted style={{width:"100%", height:"100%"}}>
              <source
                src="https://firebasestorage.googleapis.com/v0/b/mirai-poc.appspot.com/o/Productive-Morning.mp4?alt=media&token=db19bf02-75ec-4911-80bd-0fbbe6e67cfa"
                type="video/mp4"
              />
            </video>
            <HomepageHeading />
        </Visibility>
      </Responsive>
    );
  }
}

export default () => (
  <Web3Container
    contractJSON={MiraiCoreJSON}
    renderLoading={() => <HomePage />}
    render={({ web3, accounts, contract }) => (
      <HomePage accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);

