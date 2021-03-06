import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connectInput, reactivizeForm } from '../../src/';


class TextInput extends Component {

  handleChange(e) {
    const value = e.target.value;
    this.props.propagateValue(value)
  }

  render() {
    const {
      showErrors,
      defaultValue,
      value,
      placeholder
    } = this.props;

    return (
      <input className={showErrors && 'error'}
        type="text"
        value={ value }
        placeholder={ placeholder }
        onChange={ (e) => this.handleChange(e) } />
    );
  }
}
const defaultValidator = {
  validationFunction: value => value !== 'test',
  errorMessage: 'the value should not be equal to "test"'
}
const WrappedTextInput = connectInput(TextInput, {defaultValidator});


class SimpleForm extends Component {
  constructor(props) {
    super(props);
  }

  // Handle the form submition like you normally would
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.isValid()) {
      const rawData = this.props.getFormData();
      console.log('Here is your form data: ', rawData);
    } else {
      this.props.showErrors();
    }
  }

  render() {
    const {displayErrors} = this.props
    return(
      <form className="login-form form-control"
          onSubmit={ (e) => this.handleSubmit(e) }>
        <WrappedTextInput ref="simpleInput"
            validate={['required']}
            //maxChars={30}
            value="I am a default value"
            displayErrors={displayErrors}/>
        <button type="submit">Validate</button>
      </form>
    )
  }
}

const ReactiveSimpleForm = reactivizeForm(SimpleForm, ['mobile_number', 'password']);

ReactDOM.render(
  <ReactiveSimpleForm />,
  document.getElementById('react-root')
);

