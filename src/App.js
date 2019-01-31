import React, { Component } from 'react';
import { Fragment } from 'react'
import logo from './logo.svg';
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './App.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.init= this.init.bind(this);


    this.state = {
      show: false,
      isMetaMask: false,
      isLoginMetaMask:false
    };
  }

  componentDidMount(){
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      this.setState({isLoginMetaMask:true})
     
    } else {
      // Specify default instance if no web3 instance provided
   
      this.setState({ isMetaMask: true });
    }
   
  }
  handleClick(e){
    e.preventDefault();
    this.init()
  }
  async init(){
    try {
      const accounts = await window.ethereum.enable()
      // You now have an array of accounts!
      // Currently only ever one:
      // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
    } catch (error) {
      // Handle error. Likely the user rejected the login:
      this.setState({isLoginMetaMask:true})
      
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    let content;
    if(this.state.isMetaMask){
      content = <Fragment>
      <p>We see that you dont have MetaMask installed ,please install it using this link
        <br />
      <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">Download MetaMask</a>
      </p>
    </Fragment>

    }
    if(this.state.isLoginMetaMask){
      content = <Fragment>
      <p>Login into MetaMask
        <br />
        <button onClick={(e) =>this.handleClick(e)} >Log In!</button>
      </p>
    </Fragment>
    }

    console.log(content)
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
            Connect With MetaMask
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lets Start!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{content}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default App;

