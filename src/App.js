
import React, { Component } from 'react';
import { Fragment } from 'react'
import { MetaMaskButton } from 'rimble-ui'
import Web3 from 'web3';
import MyComponent from './MyComponent'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './App.css';
import { resolve } from 'url';
import { actionTypes } from 'react-redux-form';
var detect = require('detect-browser').detect

var isMobile;


class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.network = this.network.bind(this)
    this.mount = this.mount.bind(this)

    this.init= this.init.bind(this);


    this.state = {
      show: false,
      install:false,
      isMetaMask: false,
      isLoginMetaMask:false,
      isDesiredNetwork:false,
      isLogin:false
    };
  }
  componentWillMount(){
      if(typeof web3 !== 'undefined'){
        this.state.install = false;
      }
      else{
        this.state.install = true;
      }
      console.log('hello')
      console.log(this.state.install)
  }

    
    mount(){
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      this.setState({isMetaMask:false})
      this.init()
     
    } else {
      // Specify default instance if no web3 instance provided
     
        const browser = detect()
      
        // Touch the web3 object to trigger Brave install prompt
       
        isMobile = !!detectMobile()

        function detectMobile() {
          return (
              navigator.userAgent.match(/Android/i)
           || navigator.userAgent.match(/webOS/i)
           || navigator.userAgent.match(/iPhone/i)
           || navigator.userAgent.match(/iPad/i)
           || navigator.userAgent.match(/iPod/i)
           || navigator.userAgent.match(/BlackBerry/i)
           || navigator.userAgent.match(/Windows Phone/i)
          )
        }
        if(!isMobile){
          switch (browser.name) {
      
            case 'firefox':
              window.open('https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/','_blank')
             
        
              break
            
              case 'chrome':
               window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en','_blank')
        
            case 'opera':
              window.open('https://addons.opera.com/en/extensions/details/metamask/','_blank')
              
              break
            
           }

        }
       
        this.setState({ isMetaMask: true });

        

        
        
      }
      
      

    
   
  }
  
  async init(){
    try {
      const accounts = await window.ethereum.enable()
      this.setState({isDesiredNetwork:true,
      isMetaMask:false})
      this.network()
    
    } catch (error) {
      
      this.setState({isLoginMetaMask:true,isMetaMask:false})
      
    }
    window.ethereum.on('accountsChanged',(accounts) => {
      console.log(accounts)
      if(accounts.length===1){ console.log('hi')
        this.setState({isLoginMetaMask:true,
          isMetaMask: false,
          isDesiredNetwork:false,
          isLogin:false
        })
        
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
      content = <MyComponent tag='boo'></MyComponent>

    }
    if(this.state.isLoginMetaMask){
      content = <MyComponent tag='foo'>
      </MyComponent>
     
    }
    if(this.state.isDesiredNetwork){
      content = <MyComponent tag='coo'>

      </MyComponent>
    }
    if(this.state.isLogin){
      content = <MyComponent tag='doo' ></MyComponent>
    }
    if(isMobile){
      content = <Fragment>
        Mobile coming soon!
      </Fragment>
    }
    console.log(this.state.install)
    
    return (
      <>
       
        <MetaMaskButton mb={3} onClick={this.handleShow}>{this.state.install?"Install MetaMask":"Connect with MetaMask"}</MetaMaskButton>


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
              Done!
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default App;

