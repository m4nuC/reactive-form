/**
 * This wrapper has 2 function:
 * 1- Make an input field validable
 *
 * TODO: Extract as an open sourced Module?
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import validators from './utils/validators';
import {utils as fp} from 'jsfp';
import InputMessage from './components/InputMessage';

const renderErrorMessage = (errors) => <InputMessage type="error" message={errors[0]} />
const renderCharCount = (maxChars, chars) => <InputMessage type="counter" message={ chars + '/' + maxChars } />
const AGREE_TO_ALL = 'AGREE_TO_ALL';
const agreableValidator = value => [true];
const makeDownstreamValidatorAgreable = value => value == '' || ! value ? AGREE_TO_ALL : value;

const chain = fp.curry((array, value) => {
  if (value === AGREE_TO_ALL) return array.map((f) => true );
  return array.map((f) => f(value));
});

const getValidationFunction = (validateProp) => {
  const correspondance = {
    'email' : 'isEmail',
    'alpha-num' : 'isAlphaNum',
    'required' : 'isRequiered',
    'num' : 'isNum',
    'int' : 'isInt',
    'phone' : 'isPhone',
    'min:6': 'minSize6',
    fileSize: 'fileSize',
    isImage: 'isImage',
    'isDocFile': 'isDocFile',
    isDocOrImageFile: 'isDocOrImageFile',
    fileSize2: 'fileSize2',
    enabled: 'enabled',
    'float': 'isFloat',
    'url': 'isURL'
  }
  if ( ! validators[correspondance[validateProp]] ) throw new Error( validateProp + ' validator does not exist. Check makeValidable()' );
  return validators[correspondance[validateProp]];
}

const getErrorMsgId = (validateProp) => {
  const correspondance = {
    'email' : 'forms.errors.email',
    'alpha-num' : 'forms.errors.alphaNum',
    'required' : 'forms.errors.required',
    'num' : 'forms.errors.num',
    'int' : 'forms.errors.integer_only',
    'float' : 'forms.errors.num',
    'enabled': 'forms.errors.no_enabled_value',
    'phone' : 'forms.errors.phone',
    'min:6' : 'forms.errors.min_size6',
    'fileSize': 'forms.errors.file_too_large',
    'isImage' : 'forms.errors.not_image',
    'isURL' : 'forms.errors.URL_not_valid',
    'isDocOrImageFile': 'forms.errors.not_doc_or_image',
    file_too_large2: 'forms.errors.file_too_large2',
  }
   const message = correspondance[validateProp];

  if ( message < 0 ) throw new Error( validateProp + ' has no error message. Check makeValidable()' );
  return message;
}

const makeValidator = (validator, error) => (value) =>  validator(value) || ({
  valid: false,
  error: error
});


const defaultOpt = {
  className: 'form-item',
  mandatoryClassName: 'mandatory',
}


/**
 * HOC that enabled validation on a field
 * @param  {[type]} Comp [description]
 * @return {[type]}      [description]
 *
 */

export default (Comp, opt = {}) => class Validable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || undefined
    }
    this._options = Object.assign({}, defaultOpt, opt);
  }

  reachedMaxChars(value) {
    return this.props.maxChars && this.props.maxChars < value.length
  }

  /**
   * Runs the validtion
   * and Format the error object return by Validator
   *
   * @param  {Any} value: the value to be validated
   * @return {Array} The array of error. Empty array if validation passes
   *
   */
  getErrors() {

    // No matter if have validation rules or not,
    // this field should contain a validator
    if ( ! this.validator ) {
      throw new Error( 'A validator should be defined. Did you extend Validable Component via makeValidable()?' );
    }

    // Filter out the errors and flatten result
    let filterAndFlatten = fp.compose(fp.map((input) => input.error), fp.filter((input) => input.error));
    const errors = filterAndFlatten(this.validator(this.getValue()));

    if( this.props.error ) errors.unshift(this.props.error)
    return errors;
  }

  getValue() {
    return this.state.value;
  }

  isValid() {
    const errors = this.getErrors(this.getValue());
    return errors && errors.length === 0;

  }

  componentWillMount() {

    let validators = null;

    // If we have valdation rules on this Component we need to generate the validators
    if ( this.props.validate && this.props.validate.length > 0 ) {

      // Create an array of validator function according to the validate prop rules
      validators = this.props.validate.map((prop) => makeValidator(
        getValidationFunction(prop),
        getErrorMsgId(prop))
      );

      // if this._options.defaultValidator.function exits then use it
      if (this._options.defaultValidator && this._options.defaultValidator.validationFunction ) {
        validators.push(
          makeValidator(
            this._options.defaultValidator.validationFunction,
            this._options.defaultValidator.errorMessage
          )
        )
      }

      if (this.props.validate.indexOf('required') === -1 ) {
        // If a field is not requiered but has other validation on it,
        // it should not trigger validation when no value are filled in
        this.validator = fp.compose(chain( validators ), makeDownstreamValidatorAgreable)
      }

    // Else we make an agreableValidator. This allow to keep behvior in
    // between validable and non validable field similar
    } else {
      validators = [agreableValidator];
      // if this._options.defaultValidator.validationFunction exits then use it
      if (this._options.defaultValidator && this._options.defaultValidator.validationFunction ) {
        validators.push(
          makeValidator(
            this._options.defaultValidator.validationFunction,
            this._options.defaultValidator.errorMessage
          )
        )
      }
    }

    // Chain all validators
    this.validator = chain( validators );
  }

  propagateValue(value) {
    if ( ! this.reachedMaxChars(value) ) {
      this.setState({value})
    }
  }

  render() {
    const {
      mandatory,
      displayErrors,
      maxChars,
      style
    } = this.props;

    const className = `${this._options.className} ${mandatory ? this._options.mandatoryClassName : ''}`;
    const errors = this.getErrors(this.getValue());
    const showErrors = errors.length > 0 && displayErrors;
    const value = this.getValue();
    return (
      <div className={className} style={style}>
        <Comp ref="wrappedInput"
          {...this.props}
          value={value}
          isValid={() => this.isValid()}
          propagateValue={ (value) => this.propagateValue(value) }
          showErrors={ showErrors }
          getValue={ () => this.getValue() }
          getErrors={ () => this.getErrors() }/>

        { maxChars ? renderCharCount(maxChars, value.length) : '' }
        { showErrors ? renderErrorMessage(errors) : '' }
      </div>
    )
  }
}
