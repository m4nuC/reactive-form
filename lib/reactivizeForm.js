"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * HOC that maintain form state. All it's inputs are controlled.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @todo rewrite and extrat and open source this.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


exports.default = function (Comp) {
  var FormWrapper = function (_Component) {
    _inherits(FormWrapper, _Component);

    function FormWrapper(props) {
      _classCallCheck(this, FormWrapper);

      var _this = _possibleConstructorReturn(this, (FormWrapper.__proto__ || Object.getPrototypeOf(FormWrapper)).call(this, props));

      _this.state = {
        displayErrors: props.displayErrors || false
      };
      return _this;
    }

    /**
     * Get the wrappedComponent by ref
     * @return {Component}
     *
     */


    _createClass(FormWrapper, [{
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        return this.refs.wrappedForm;
      }

      /**
       * Gather all form input values
       *
       * @return {Object} Key: value
       *
       */

    }, {
      key: "getFormData",
      value: function getFormData() {
        var formData = {};

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.entries(this.refs.wrappedForm.refs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var key = _step$value[0];
            var input = _step$value[1];

            var _wrappedInput = input.refs.wrappedInput;
            formData[key] = _wrappedInput.props.value;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return formData;
      }

      /**
       * Check if the form has errors
       *
       * @return {Boolean}
       *
       */

    }, {
      key: "isValid",
      value: function isValid() {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.entries(this.refs.wrappedForm.refs)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2);

            var key = _step2$value[0];
            var input = _step2$value[1];

            var _wrappedInput = input.refs.wrappedInput;
            var errors = _wrappedInput.props.getErrors();
            if (errors.length > 0) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return true;
      }
    }, {
      key: "showErrors",
      value: function showErrors() {
        this.setState({ displayErrors: true });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        //console.log(`Rendering the wrappeed ${Comp.name}`)
        return _react2.default.createElement(Comp, _extends({ ref: "wrappedForm",
          isValid: function isValid() {
            return _this2.isValid();
          },
          setFormData: function setFormData(data) {
            return _this2.setFormData(data);
          },
          displayErrors: this.state.displayErrors,
          showErrors: function showErrors() {
            return _this2.showErrors();
          },
          getFormData: function getFormData() {
            return _this2.getFormData();
          }
        }, this.props));
      }
    }]);

    return FormWrapper;
  }(_react.Component);

  return FormWrapper;
};