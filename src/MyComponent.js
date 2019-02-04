import React, { Component } from 'react';
import isLoginMetaMask from './components/isLoginMetaMask';
import isMetaMask from './components/isMetaMask'
import  isDesiredNetwork  from './components/isDesiredNetwork'
import Login from './components/Login'

class MyComponent extends Component {
    components = {
        foo: isLoginMetaMask,
        boo:isMetaMask,
        coo:isDesiredNetwork,
        doo:Login
    };
    render() {
       const TagName = this.components[this.props.tag || 'foo'];
       return <TagName />
    }
}
export default MyComponent;