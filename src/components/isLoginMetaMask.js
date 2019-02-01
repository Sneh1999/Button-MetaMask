import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';


export default class isLoginMetaMask extends Component{

    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <p>Login into MetaMask
            <br />
            <Button onClick={(e) =>this.handleClick(e)} variant="primary">Log In!</Button>
            
          </p>
            </div>
          
        )
    }
}