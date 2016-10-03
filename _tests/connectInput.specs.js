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
    expect(hoc.name).to.equal('Validable');
    done();
  });

  it ('should take an option object and merge it with default options', function (done) {
    const HOC = connectInput(TextInput, {className: 'testName'});
    const wrapper = shallow(<HOC />);
    expect(wrapper.find('.testName')).to.have.length(1);
    done();
  });

  it ('should set default value if any', function (done) {
    const HOC = connectInput(TextInput, null);
    const wrapper = shallow(<HOC value="testValue"/>);
    expect(wrapper.state('value')).to.equal('testValue');
    done();
  });


  it ('should set a default agreable validator is no validation method is specified', function (done) {
    const HOC = connectInput(TextInput, null);
    const wrapper = shallow(<HOC value="testValue"/>);
    const instance = wrapper.instance();
    expect(instance._reactInternalInstance._instance.validator.name).to.equal('agreableValidator');
    done();
  });
});