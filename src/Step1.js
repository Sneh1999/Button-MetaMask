class Step1 extends React.Component {
    constructor(props) {
      super(props);
      // Bindings for form fields would go here,
      // and state would keep track of field input
    }
    _validate() {
      // a sanitized version of state can be passed instead
      this.props.afterValid(this.state)
    }
    render() {
      if (this.props.currentStep !== 1) {
        return null;
      }
      
      return(
        <form>
          // Form fields would go here
          <button onClick={this._validate} />
        </form>
      );
    }
  }