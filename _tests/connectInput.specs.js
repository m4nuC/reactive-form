'use strict';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;
chai.use(require('sinon-chai'));

import connectInput from '../src/connectInput';

class TextInput extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <input type="text" value={value}/>
    )
  }
}


describe('connectInput()', function() {
  it ('should retrun a Validable HOC', function (done) {
    const hoc = connectInput(TextInput);
    expect(hoc.name).to.be('Validable');
    done();
  });
});