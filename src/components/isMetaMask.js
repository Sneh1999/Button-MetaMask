import React, { Component } from 'react';
import Web3 from 'web3';



export default class isMetaMask extends Component{
    
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                <p>We see that you dont have MetaMask installed ,please install it using this link
                 <br />
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">Download MetaMask</a>
                </p>
            </div>
        )
    }
}