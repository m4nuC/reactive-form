/**
 * VALIDATIONS
 */
module.exports.isEmail = (string) => {
  const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return re.test(string);
}

module.exports.isAlphaNum = (string) => {
  const re = /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/;
  return ! re.test(string);
}

module.exports.isAlphaNumCN = (string) => {
  const re = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;
  return re.test(string);
}

module.exports.isPhone = (string) => {
  const re = /^[0-9\-\s]+$/
  return re.test(string);
}

module.exports.isNum = (string) => {
  const re = /^[+-]?\d*\.\d+$|^[+-]?\d+(\.\d*)?$/
  return re.test(string);
}

module.exports.isInt = (string) => {
  const re = /^\d+$/
  return re.test(string);
}

module.exports.isFloat = (string) => {
  //const re = /^\d{0,2}(\.\d{1,2})?$/
  const re = /^[+-]?\d*[\.\,]\d{0,2}$|^[+-]?\d+([\.\,]\d{0,2})?$/
  return re.test(string);
}

module.exports.fileSize = (file) => {
  return file.size/1024/1024 <=  2;
}

module.exports.fileSize2 = (file) => {
  return file.size/1024/1024 <=  5;
}

module.exports.isImage = (file) => {
  const ext = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
  const imgs = ['png', 'jpg', 'jpeg'];
  return imgs.indexOf(ext) > -1;
}

module.exports.isDocFile = (file) => {
  const ext = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
  const imgs = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'rtf'];
  return imgs.indexOf(ext) > -1;
}

module.exports.isDocOrImageFile = (file) => {
  const ext = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
  const imgs = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'rtf', 'png', 'jpg', 'jpeg'];
  return imgs.indexOf(ext) > -1;
}

module.exports.minSize6 = (string) => {
  return string.length >= 6;
}

module.exports.isPhone = (numberObj) => {
  if (!numberObj || !numberObj.prefix || !numberObj.number) return false;
  var re = /^[0-9\-\s\.]{7,22}$/;
  return re.test(numberObj.number);
};

module.exports.isRequiered = (value) => {
  return Array.isArray(value) ? value.length > 0 : value && value !== '';
}

module.exports.enabled = (values) => {
  if ( ! values ) return false;
  return values.reduce((acc, next) => next.enabled === 'true' || acc, false);
}

module.exports.isURL = (string) => {
  return /^(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(string);
}
