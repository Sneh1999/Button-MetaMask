import React, { Component } from 'react';
import isLoginMetaMask from './components/isLoginMetaMask';
import isMetaMask from './components/isMetaMask'

class MyComponent extends Component {
    components = {
        foo: isLoginMetaMask,
        boo:isMetaMask
    };
    render() {
       const TagName = this.components[this.props.tag || 'foo'];
       return <TagName />
    }
}
export default MyComponent;