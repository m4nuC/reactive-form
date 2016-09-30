/**
 * HOC that maintain form state. All it's inputs are controlled.
 * @todo rewrite and extrat and open source this.
 */
import React, { Component } from 'react';

export default (Comp) => {

  class FormWrapper extends Component {
    constructor(props) {
      super(props);
      this.state = {
        displayErrors: props.displayErrors || false
      }
    }

    /**
     * Get the wrappedComponent by ref
     * @return {Component}
     *
     */
    getWrappedInstance() {
      return this.refs.wrappedForm;
    }


    /**
     * Gather all form input values
     *
     * @return {Object} Key: value
     *
     */
    getFormData() {
      let formData = {};

      for(let [key, input] of Object.entries(this.refs.wrappedForm.refs)) {
        const _wrappedInput = input.refs.wrappedInput;
        formData[key] = _wrappedInput.props.value;
      }
      return formData;
    }

    /**
     * Check if the form has errors
     *
     * @return {Boolean}
     *
     */
    isValid() {
      for(let [key, input] of Object.entries(this.refs.wrappedForm.refs)) {
        const _wrappedInput = input.refs.wrappedInput;
        const errors = _wrappedInput.props.getErrors();
        if (errors.length > 0) {
          return false;
        }
      }
      return true;
    }

    showErrors() {
      this.setState({ displayErrors: true });
    }


    render() {
      //console.log(`Rendering the wrappeed ${Comp.name}`)
      return(
        <Comp ref="wrappedForm"
          isValid={() => this.isValid()}
          setFormData={(data) => this.setFormData(data)}
          displayErrors={ this.state.displayErrors }
          showErrors={() => this.showErrors() }
          getFormData={() => this.getFormData()}/>
      )
    }
  }

  return FormWrapper;
}