import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Web3 from 'web3';
import { initialFieldState } from 'react-redux-form';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isConnected: false};
    this.init = this.init.bind(this)
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }
  componentWillMount() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
    
      this.setState({isConnected: true});
      
    } else {
      // Specify default instance if no web3 instance provided
      this.setState({isConnected: false});
    }
    this.init()
 
  }
  async init() {
    try {
      const accounts = await ethereum.enable();
      // You now have an array of accounts!
      // Currently only ever one:
      // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
    } catch (error) {
      // Handle error. Likely the user rejected the login:
      return (
        <div>
          <h2>Install Metamask on https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en</h2>
        </div>
      )
      
    }
  }
  render() {
    return (
      <div>
         <Button variant="outline-primary">Primary</Button>
        <h2>Is connected?:</h2><br/>
        {this.state.isConnected?'Connected to local node':'Not Connected'}
      </div>
    );
  }
}
export default App;