'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _validators = require('./utils/validators');

var _validators2 = _interopRequireDefault(_validators);

var _jsfp = require('jsfp');

var _InputMessage = require('./components/InputMessage');

var _InputMessage2 = _interopRequireDefault(_InputMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This wrapper has 2 function:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 1- Make an input field validable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * TODO: Extract as an open sourced Module?
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var renderErrorMessage = function renderErrorMessage(errors) {
  return _react2.default.createElement(_InputMessage2.default, { type: 'error', message: errors[0] });
};
var renderCharCount = function renderCharCount(maxChars, chars) {
  return _react2.default.createElement(_InputMessage2.default, { type: 'counter', message: chars + '/' + maxChars });
};
var AGREE_TO_ALL = 'AGREE_TO_ALL';
var agreableValidator = function agreableValidator(value) {
  return [true];
};
var makeDownstreamValidatorAgreable = function makeDownstreamValidatorAgreable(value) {
  return value == '' || !value ? AGREE_TO_ALL : value;
};

var chain = _jsfp.utils.curry(function (array, value) {
  if (value === AGREE_TO_ALL) return array.map(function (f) {
    return true;
  });
  return array.map(function (f) {
    return f(value);
  });
});

var getValidationFunction = function getValidationFunction(validateProp) {
  var correspondance = {
    'email': 'isEmail',
    'alpha-num': 'isAlphaNum',
    'required': 'isRequiered',
    'num': 'isNum',
    'int': 'isInt',
    'phone': 'isPhone',
    'min:6': 'minSize6',
    fileSize: 'fileSize',
    isImage: 'isImage',
    'isDocFile': 'isDocFile',
    isDocOrImageFile: 'isDocOrImageFile',
    fileSize2: 'fileSize2',
    enabled: 'enabled',
    'float': 'isFloat',
    'url': 'isURL'
  };
  if (!_validators2.default[correspondance[validateProp]]) throw new Error(validateProp + ' validator does not exist. Check makeValidable()');
  return _validators2.default[correspondance[validateProp]];
};

var getErrorMsgId = function getErrorMsgId(validateProp) {
  var correspondance = {
    'email': 'forms.errors.email',
    'alpha-num': 'forms.errors.alphaNum',
    'required': 'forms.errors.required',
    'num': 'forms.errors.num',
    'int': 'forms.errors.integer_only',
    'float': 'forms.errors.num',
    'enabled': 'forms.errors.no_enabled_value',
    'phone': 'forms.errors.phone',
    'min:6': 'forms.errors.min_size6',
    'fileSize': 'forms.errors.file_too_large',
    'isImage': 'forms.errors.not_image',
    'isURL': 'forms.errors.URL_not_valid',
    'isDocOrImageFile': 'forms.errors.not_doc_or_image',
    file_too_large2: 'forms.errors.file_too_large2'
  };
  var message = correspondance[validateProp];

  if (message < 0) throw new Error(validateProp + ' has no error message. Check makeValidable()');
  return message;
};

var makeValidator = function makeValidator(validator, error) {
  return function (value) {
    return validator(value) || {
      valid: false,
      error: error
    };
  };
};

var defaultOpt = {
  className: 'form-item',
  mandatoryClassName: 'mandatory'
};

/**
 * HOC that enabled validation on a field
 * @param  {[type]} Comp [description]
 * @return {[type]}      [description]
 *
 */

exports.default = function (Comp) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (_Component) {
    _inherits(Validable, _Component);

    function Validable(props) {
      _classCallCheck(this, Validable);

      var _this = _possibleConstructorReturn(this, (Validable.__proto__ || Object.getPrototypeOf(Validable)).call(this, props));

      _this.state = {
        value: props.value || undefined
      };
      _this._options = Object.assign({}, defaultOpt, opt);
      return _this;
    }

    /**
     * Runs the validtion
     * and Format the error object return by Validator
     *
     * @param  {Any} value: the value to be validated
     * @return {Array} The array of error. Empty array if validation passes
     *
     */


    _createClass(Validable, [{
      key: 'getErrors',
      value: function getErrors() {

        // No matter if have validation rules or not,
        // this field should contain a validator
        if (!this.validator) {
          throw new Error('A validator should be defined. Did you extend Validable Component via makeValidable()?');
        }

        // Filter out the errors and flatten result
        var filterAndFlatten = _jsfp.utils.compose(_jsfp.utils.map(function (input) {
          return input.error;
        }), _jsfp.utils.filter(function (input) {
          return input.error;
        }));
        var errors = filterAndFlatten(this.validator(this.getValue()));

        if (this.props.error) errors.unshift(this.props.error);
        return errors;
      }
    }, {
      key: 'getValue',
      value: function getValue() {
        return this.state.value;
      }
    }, {
      key: 'isValid',
      value: function isValid() {
        var errors = this.getErrors(this.getValue());
        return errors && errors.length === 0;
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {

        var validators = null;

        // If we have valdation rules on this Component we need to generate the validators
        if (this.props.validate && this.props.validate.length > 0) {

          // Create an array of validator function according to the validate prop rules
          validators = this.props.validate.map(function (prop) {
            return makeValidator(getValidationFunction(prop), getErrorMsgId(prop));
          });

          // if opt.defaultValidator.function exits then use it
          if (opt.defaultValidator && opt.defaultValidator.validationFunction) {
            validators.push(makeValidator(opt.defaultValidator.validationFunction, opt.defaultValidator.errorMessage));
          }

          if (this.props.validate.indexOf('required') === -1) {
            // If a field is not requiered but has other validation on it,
            // it should not trigger validation when no value are filled in
            this.validator = _jsfp.utils.compose(chain(validators), makeDownstreamValidatorAgreable);
          }

          // Else we make an agreableValidator. This allow to keep behvior in
          // between validable and non validable field similar
        } else {
          validators = [agreableValidator];
          // if opt.defaultValidator.validationFunction exits then use it
          if (opt.defaultValidator && opt.defaultValidator.validationFunction) {
            validators.push(makeValidator(opt.defaultValidator.validationFunction, opt.defaultValidator.errorMessage));
          }
        }

        // Chain all validators
        this.validator = chain(validators);
      }
    }, {
      key: 'propagateValue',
      value: function propagateValue(value) {
        this.setState({ value: value });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props;
        var mandatory = _props.mandatory;
        var displayErrors = _props.displayErrors;
        var style = _props.style;


        var className = this._options.className + ' ' + (mandatory ? this._options.mandatoryClassName : '');
        var errors = this.getErrors(this.getValue());
        var showErrors = errors.length > 0 && displayErrors;

        return _react2.default.createElement(
          'div',
          { className: className, style: style },
          _react2.default.createElement(Comp, _extends({ ref: 'wrappedInput'
          }, this.props, {
            value: this.getValue(),
            isValid: function isValid() {
              return _this2.isValid();
            },
            propagateValue: function propagateValue(value) {
              return _this2.propagateValue(value);
            },
            showErrors: showErrors,
            getValue: function getValue() {
              return _this2.getValue();
            },
            getErrors: function getErrors() {
              return _this2.getErrors();
            } })),
          showErrors ? renderErrorMessage(errors) : ''
        );
      }
    }]);

    return Validable;
  }(_react.Component);
};