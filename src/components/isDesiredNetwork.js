import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';
import image from '../Ropsten.png'


export default class isDesiredNetwork extends Component{

    constructor(props){
        super(props)
        this.state={
            image:'',
            clicked:true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        e.preventDefault();
        this.setState({clicked:!this.state.clicked})
        if(this.state.clicked){
            this.state.image =  <img  src={image}  alt="fireSpot"/>
        }
        else{
            this.state.image=''
        }
       
        console.log('hello')
    }
    
    render(){
        return(
            <div>
                <Button onClick={(e)=>this.handleClick(e)}> Connect To Ropsten Network</Button>
                <br/>
                {this.state.image}
               </div>
          
        )
    }
}