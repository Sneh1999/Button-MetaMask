import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Web3 from 'web3';
import { initialFieldState } from 'react-redux-form';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isConnected: false};
    this.init = this.init.bind(this)
    this.HandleClick= this.HandleClick.bind(this)
    
  }
  componentWillMount() {
    
    this.init()
 
  }
  HandleClick(e){
    this.preventdefault();
    

  }
  async init() {
    if (typeof window.web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      window.alert("MetamASK INSTALLE")
    } else {
      // Specify default instance if no web3 instance provided
      window.alert("MetamASK NOT INSTALLE .installl from https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en")
    }
    try {
      const accounts = await ethereum.enable();
      // You now have an array of accounts!
      // Currently only ever one:
      // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
    } catch (error) {
      // Handle error. Likely the user rejected the login:
      return (
        <div>
          <h2>Install Metamask on</h2>
        </div>
      )
      
    }
  }
  render() {
    return (
      <div>
         <Button variant="outline-primary" onClick={(e) => this.HandleClick(e)}> Primary</Button>
        <h2>Is connected?:</h2><br/>
        {this.state.isConnected?'Connected to local node':'Not Connected'}
      </div>
    );
  }
}
export default App;