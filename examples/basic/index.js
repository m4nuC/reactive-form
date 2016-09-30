import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connectInput, reactivizeForm } from '../../src/';

const Button = ({label, onClick}) => {
  return(
    <button onClick={onClick}>
        { label }
    </button>
  );
}

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

const WrappedTextInput = connectInput(TextInput);


class SimpleForm extends Component {
  constructor(props) {
    super(props);
  }

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

        <div className="form-row">
          <WrappedTextInput ref="simpleInput"
            defaultValue="I am a default value"
            validate={['required']}
            displayErrors={displayErrors}/>
        </div>

        <Button type="submit" label="validate" className="btn" />
      </form>
    )
  }
}

const ReactiveSimpleForm = reactivizeForm(SimpleForm, ['mobile_number', 'password']);

ReactDOM.render(
  <ReactiveSimpleForm />,
  document.getElementById('react-root')
);

