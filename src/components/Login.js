import React, { Component } from 'react';
import Web3 from 'web3';


var accounts;
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.check = this.check.bind(this)

    }
    componentDidMount() {
        this.check()
    }

    check() {

        setInterval(function () {
            var account = window.web3.eth.accounts[0];
            if (window.web3.eth.accounts[0] !== account) {
                account = window.web3.eth.accounts[0];

                console.log(account)

            }
            accounts = account
            console.log(accounts)

        }, 100);


    }
    render() {
        return (
            <div>
                <p>Logged in as {accounts}
                    <br />
                </p>
            </div>
        )
    }
}