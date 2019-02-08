import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import image from '../Ropsten.png'
import Web3 from 'web3';


export default class isDesiredNetwork extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
            clicked: true,
            description: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ clicked: !this.state.clicked })
        if (this.state.clicked) {
            this.state.image = <img src={image} height="300" width="450 " alt="fireSpot" />
            this.state.description = 'Go to the network\'s dropdown and Select Ropsten network'
        }
        else {
            this.state.image = ''
            this.state.description = ''
        }


    }

    render() {
        return (
            <div>
                <Button onClick={(e) => this.handleClick(e)}> Connect To Ropsten Network</Button>
                <br />
                {this.state.image}
                <br />
                {this.state.description}
            </div>

        )
    }
}