# Barebone Form Validation for ReactJS


[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]


[npm-url]: https://npmjs.org/package/reactive-from
[download-url]: https://npmjs.org/package/reactive-from

Bring simple and easy validation to any react froms.

Just wrap a React input using the `connectInput()` API to instantenously give it validation capabilities.

## Examples

1. Start by creating **connected** inputs using the `connectInput` API. i.g.:

**TextInput.js**
```js
import React, { Component } from 'react';
import { connectInput } from '../../src/';


// We export here the raw component so it can be imported like `import {TextInput} from './TextInput'`.
// This is usful when the wrapper is not needed, for instance when Unit testing.
export class TextInput extends Component {

  handleChange(e) {
    const value = e.target.value;
    // This propagate the input value to the state
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

export default connectInput(TextInput);
```


**Forms.js**
```js
export class SimpleForm extends Component {
  // Handle the form submition like you normally would
  handleSubmit(e) {
    e.preventDefault();

    // isValid() check if the form is error free
    if (this.props.isValid()) {
      const rawData = this.props.getFormData();
      console.log('Here is your form data: ', rawData);
    } else {
      // Tell the form to show all errors
      this.props.showErrors();
    }
  }

  render() {
    const {displayErrors} = this.props
    return(
      <form className="login-form form-control"
          onSubmit={ (e) => this.handleSubmit(e) }>
        <WrappedTextInput ref="simpleInput"
            error="this is a backend error"
            value="I am a default value"
            validate={['required']} // Set validation rules
            displayErrors={displayErrors}/>
        <button type="submit">Validate</button>
      </form>
    )
  }
}

default export reactivizeForm(SimpleForm);
```

## Validation rules

I will be adding more as time goes

- isEmail
- isAlphaNum
- isRequiered
- isNum
- isInt
- isPhone
- minSize6
- fileSize
- isImage
- isDocFile
- isDocOrImageFile
- enabled
- isFloat
