'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import {FormattedMessage} from 'react-intl';

var InputMessage = function InputMessage(_ref) {
  var type = _ref.type;
  var message = _ref.message;

  var className = 'form-message ' + type;
  var isError = type === 'error';

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'span',
      null,
      isError ? message : ''
    ),
    (function () {
      return !isError && _react2.default.createElement(
        'span',
        { className: 'char-count' },
        message
      );
    })()
  );
};

exports.default = InputMessage;