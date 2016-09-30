'use strict';

/**
 * VALIDATIONS
 */
module.exports.isEmail = function (string) {
  var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return re.test(string);
};

module.exports.isAlphaNum = function (string) {
  var re = /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/;
  return !re.test(string);
};

module.exports.isAlphaNumCN = function (string) {
  var re = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;
  return re.test(string);
};

module.exports.isPhone = function (string) {
  var re = /^[0-9\-\s]+$/;
  return re.test(string);
};

module.exports.isNum = function (string) {
  var re = /^[+-]?\d*\.\d+$|^[+-]?\d+(\.\d*)?$/;
  return re.test(string);
};

module.exports.isInt = function (string) {
  var re = /^\d+$/;
  return re.test(string);
};

module.exports.isFloat = function (string) {
  //const re = /^\d{0,2}(\.\d{1,2})?$/
  var re = /^[+-]?\d*[\.\,]\d{0,2}$|^[+-]?\d+([\.\,]\d{0,2})?$/;
  return re.test(string);
};

module.exports.fileSize = function (file) {
  return file.size / 1024 / 1024 <= 2;
};

module.exports.fileSize2 = function (file) {
  return file.size / 1024 / 1024 <= 5;
};

module.exports.isImage = function (file) {
  var ext = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
  var imgs = ['png', 'jpg', 'jpeg'];
  return imgs.indexOf(ext) > -1;
};

module.exports.isDocFile = function (file) {
  var ext = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
  var imgs = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'rtf'];
  return imgs.indexOf(ext) > -1;
};

module.exports.isDocOrImageFile = function (file) {
  var ext = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
  var imgs = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'rtf', 'png', 'jpg', 'jpeg'];
  return imgs.indexOf(ext) > -1;
};

module.exports.minSize6 = function (string) {
  return string.length >= 6;
};

module.exports.isPhone = function (numberObj) {
  if (!numberObj || !numberObj.prefix || !numberObj.number) return false;
  var re = /^[0-9\-\s\.]{7,22}$/;
  return re.test(numberObj.number);
};

module.exports.isRequiered = function (value) {
  return Array.isArray(value) ? value.length > 0 : value && value !== '';
};

module.exports.enabled = function (values) {
  if (!values) return false;
  return values.reduce(function (acc, next) {
    return next.enabled === 'true' || acc;
  }, false);
};