import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Web3 from "web3";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Signed in with MetaMask
      </div>
    );
  }
}
