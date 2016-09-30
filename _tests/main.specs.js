'use strict';

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));


describe('There is smoke', function() {
	it ('there should be fire', function (done) {
		expect(true).to.be.true;
		done();
	});
});