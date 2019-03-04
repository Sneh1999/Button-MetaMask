import React, { Component } from "react";
import { Fragment } from "react";
import { MetaMaskButton } from "rimble-ui";
import Web3 from "web3";
import MyComponent from "./MyComponent";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

var detect = require("detect-browser").detect;

var isMobile;
var count;

class MetaMaskLoginButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.network = this.network.bind(this);
    this.mount = this.mount.bind(this);

    this.init = this.init.bind(this);
    

    this.state = {
      show: false,
      install: false,
      isMetaMask: false,
      isRedirect: false,
      isLoginMetaMask: false,
      isDesiredNetwork: false,
      isLogin: false
    };
  }
  componentWillMount() {
    if (typeof web3 !== "undefined") {
      this.state.install = false;
      window.ethereum.on("networkChanged", accounts => {
        if (accounts === "3") {
          this.setState({
            isLogin: true,
            isDesiredNetwork: false,
            isMetaMask: false,
            isLoginMetaMask: false
          });
        } else {
          this.setState({
            isLogin: false,
            isDesiredNetwork: true,
            isMetaMask: false,
            isLoginMetaMask: false
          });
        }
      });
    } else {
      this.state.install = true;
    }
  }

  componentDidMount() {
    var countone = window.sessionStorage.getItem("countone");
    if(countone ==='1'){
      console.log('hello')
      this.setState({ isMetaMask: true , show: true  });
    
    }
    setInterval(() => {
      var count = window.sessionStorage.getItem("count");
      console.log(count);
      if (typeof web3 !== "undefined") {
        if (window.web3.eth.accounts[0]) {
          if (count !== "1") {
            window.open("http://fwd.metamask.io/");
            console.log("hello");
          }
          sessionStorage.setItem("count", 1);
        }
      } else {
        window.location.reload();
      }
    }, 5000);
  }

  mount() {
    if (typeof web3 !== "undefined") {
      this.setState({ isMetaMask: false });
      this.init();
    } else {
      sessionStorage.setItem("countone", 1);
      const browser = detect();

      isMobile = !!detectMobile();

      function detectMobile() {
        return (
          navigator.userAgent.match(/Android/i) ||
          navigator.userAgent.match(/webOS/i) ||
          navigator.userAgent.match(/iPhone/i) ||
          navigator.userAgent.match(/iPad/i) ||
          navigator.userAgent.match(/iPod/i) ||
          navigator.userAgent.match(/BlackBerry/i) ||
          navigator.userAgent.match(/Windows Phone/i)
        );
      }
      if (!isMobile) {
        switch (browser.name) {
          case "firefox":
            window.open(
              "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/",
              "_blank"
            );

            break;

          case "chrome":
            window.open(
              "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
              "_blank"
            );

          case "opera":
            window.open(
              "https://addons.opera.com/en/extensions/details/metamask/",
              "_blank"
            );

            break;
        }
      }

      this.checkonboarding();

      this.setState({ isMetaMask: true });
    }
  }

  checkonboarding() {
    setInterval(() => {
      if (typeof web3 !== "undefined") {
        this.setState({
          isRedirect: true
        });
      }
    }, 2000);

    if (this.state.isRedirect) {
      window.open("http://fwd.metamask.io/", "_blank");
      setTimeout(() => {
        window.open("http://localhost:3000/");
      }, 5000);
    }
  }

  async init() {
    try {
      const accounts = await window.ethereum.enable();
      this.setState({
        isDesiredNetwork: true,
        isMetaMask: false
      });
      this.network();
    } catch (error) {
      this.setState({ isLoginMetaMask: true, isMetaMask: false });
    }
    window.ethereum.on("accountsChanged", accounts => {
      if (accounts.length === 1) {
        this.setState({
          isLoginMetaMask: true,
          isMetaMask: false,
          isDesiredNetwork: false,
          isLogin: false
        });
        this.init();
      } else {
        this.setState({
          isLoginMetaMask: false,
          isMetaMask: false,
          isDesiredNetwork: false,
          isLogin: true
        });
      }
    });
  }

  network() {
    // If a web3 instance is already provided by Meta Mask.
    if (window.ethereum.networkVersion === "3") {
      this.setState({ isLogin: true });
    } else {
      window.ethereum.on("networkChanged", accounts => {
        if (accounts === "3") {
          this.setState({
            isLogin: true,
            isDesiredNetwork: false,
            isMetaMask: false,
            isLoginMetaMask: false
          });
        } else {
          this.setState({
            isLogin: false,
            isDesiredNetwork: true,
            isMetaMask: false,
            isLoginMetaMask: false
          });
        }
      });
    }
  }

  handleClose() {
   
    this.setState({ show: false });
  }

  handleShow() {
    
    this.setState({ show: true });
    this.mount();
  }

  render() {
    let content;
    if (this.state.isMetaMask) {
      content = <MyComponent tag="a" />;
    }
    if (this.state.isLoginMetaMask) {
      content = <MyComponent tag="b" />;
    }
    if (this.state.isDesiredNetwork) {
      content = <MyComponent tag="c" />;
    }
    if (this.state.isLogin) {
      content = <MyComponent tag="d" />;
    }
    if (isMobile) {
      content = <Fragment>Mobile coming soon!</Fragment>;
    }

    return (
      <>
        <MetaMaskButton mb={3} onClick={this.handleShow}>
          {this.state.install ? "Install MetaMask" : "Connect with MetaMask"}
        </MetaMaskButton>

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

export default MetaMaskLoginButton;
