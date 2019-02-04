import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';


export default class isDesiredNetwork extends Component{

    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div>
              <p>Connect to the right network
        <br />
      </p>
            </div>
          
        )
    }
}