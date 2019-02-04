
import React, { Component } from 'react';
import { Fragment } from 'react'
import Web3 from 'web3';
import isLoginMetaMask from './components/isLoginMetaMask'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './App.css';
import { resolve } from 'url';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.network = this.network.bind(this)
    this.mount = this.mount.bind(this)

    this.init= this.init.bind(this);


    this.state = {
      show: false,
      isMetaMask: false,
      isLoginMetaMask:false,
      isDesiredNetwork:false,
      isLogin:false
    };
  }

    
    mount(){
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      this.init()
     
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
      this.setState({isDesiredNetwork:true})
      this.network()
    
    } catch (error) {
      
      this.setState({isLoginMetaMask:true})
      
    }
    window.ethereum.on('accountsChanged',(accounts) => {
      console.log(accounts)
      if(accounts.length===1){
        console.log('hi')
        this.setState({isLoginMetaMask:true,
          isMetaMask: false,
          isDesiredNetwork:false,
          isLogin:false
        })
      }
      else{
        // this.setState({isLoginMetaMask:false,
        //   isMetaMask: false,
        //   isDesiredNetwork:false,
        //   isLogin:false
        // })
        // this.network()
      }
    
    })
  }
  network(){
    let web3;
    
    // If a web3 instance is already provided by Meta Mask.
      if (window.ethereum.networkVersion === "3") {
        this.setState({isLogin:true})
      } else {
        
          var desiredNetwork = "3"
          window.ethereum.on('networkChanged', (accounts) =>{
            console.log(accounts)
            if(accounts==="3"){
              this.setState({isLogin:true})
            }
            else{
              this.setState({isLogin:false})
              this.setState({isDesiredNetwork:true})
            }
          })
            
          
        
}

    }
  


  handleClose() {
    window.location.reload();
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
    this.mount()
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
      <p>Login In bro!
      </p>
    </Fragment>
    }
    if(this.state.isDesiredNetwork){
      content = <Fragment>
      <p>Connect to the right network
        <br />
      </p>
    </Fragment>
    }
    if(this.state.isLogin){
      content = <Fragment>
      <p>Login in into your account
        <br />
      </p>
    </Fragment>
    }
    // console.log(content)
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

