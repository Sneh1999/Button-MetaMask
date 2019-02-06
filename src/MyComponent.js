import React, { Component } from 'react';
import isLoginMetaMask from './components/isLoginMetaMask';
import isMetaMask from './components/isMetaMask'
import  isDesiredNetwork  from './components/isDesiredNetwork'
import Login from './components/Login'

class MyComponent extends Component {
    components = {
        b: isLoginMetaMask,
        a:isMetaMask,
        c:isDesiredNetwork,
        d:Login
    };
    render() {
       const TagName = this.components[this.props.tag || 'a'];
       return <TagName />
    }
}
export default MyComponent;