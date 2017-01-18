# Barebone Form Validation for ReactJS



[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/reactive-form.svg?style=flat-square
[npm-url]: https://npmjs.org/package/reactive-from
[travis-image]: https://img.shields.io/travis/m4nuC/reactive-form.svg?style=flat-square
[travis-url]: https://travis-ci.org/m4nuC/reactive-from
[download-image]: https://img.shields.io/npm/dm/reactive-form.svg?style=flat-square
[download-url]: https://npmjs.org/package/reactive-form

Bring simple validation to any react froms. To use, simply wrap a React input using the `connectInput()` API to instantenously give it validation capabilities (see bellow 1).

## Inputs

1. Start by creating **connected** inputs using the `connectInput` API. i.g.:

**TextInput.js**
```js
import React, { Component } from 'react';
import { connectInput } from '../../src/';

class TextInput extends Component {
  handleChange(e) {
    // This propagate the input value to the state
    this.props.propagateValue(e.target.value)
  }

  render() {
    const {
      showErrors,
      value
    } = this.props;

    return (
      <input className={showErrors && 'error'}
        type="text"
        value={ value }
        onChange={ (e) => this.handleChange(e) } />
    );
  }
}
export default connectInput(TextInput);
```
This is will provide your inputs with 2 functionalities :
- **Validation**: They can now take a `validate` property that accepts an array. See bellow the *Connected From* section
- **Character restriction**: Display current length of the input, and restrict to a maximun

## Connected Form
Now lets' connect the form. Simply create a react from and wrap it in `reactivizeForm()`. This is will provide your form with 3 APIs:

1. *isValid*: Return true or false
2. *showErrors*: Will set the `displayErrors` attribute to `true`, allowing to display error message on your form
3. *getFormData*: Creates a object of all the inputs values

i.g.:

```js
export class SimpleForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.isValid()) {
      // Use the form data as you wish
      console.log('Here is your form data: ', this.props.getFormData());
    } else {
      // Tell the form to show all errors
      this.props.showErrors();
    }
  }

  render() {
    const {displayErrors} = this.props
    return(
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <TextInput ref="simpleInput"
            validate={['required']} // Set validation rules
            displayErrors={displayErrors}/>
        <button type="submit">Validate</button>
      </form>
    )
  }
}

default export reactivizeForm(SimpleForm);
```

Do not forget to give your inputs a `ref` and to pass them the `displayErrors` paramter provider by the form


## Validation rules

Currently avaialble validations:

- email
- alpha-num
- required
- num
- int
- phone
- isImage

Those can be used on a `connectInput()`ed input, like so:

```
  <TextInput validate={['required']} displayErrors={displayErrors} />
```


### connectInput config object

A second, optional config object parameter, can be passed to `connectInput`. It contains the following options:

- **`defaultErrorMessages`**: An object, containing custom error message for each validator ('email', 'num', etc.). For application wide consistency, these message should be stored into a separate module, and passed to all `connectInput()ed` inputs:
```
connectInput(TextInput, {
  email: 'Enter a valid email addres',
  num: 'Numerical characters only'
  ...
})
```

- **`errorFormatter`**: A function throught which will be passed all error messages. Mostly useful for running message throught a translation system

- **`errorFormatter`**: A function throught which will be passed all error messages. Mostly useful for running message throught a translation system

- **`defaultValidator`**: A object containing a validation function (that takes a value and spit out `true` or `false`) and a string for error message:
```
const validateURL = (value) => {
  if (!value) return false;
  const target = value.target;
  return /^(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(target);
}


const defaultValidator = {
  validationFunction: validateURL,
  errorMessage: 'forms.errors.URL_not_valid'
}

export default connectInput(TextInput, {defaultValidator});
```
