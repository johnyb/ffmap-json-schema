describe('Validation API', function () {
    'use strict';

    var chai = require('chai');
    var expect = chai.expect;

    var ffmap = require('../index.js');

    it('should provide a validate method', function () {
        expect(ffmap.validate).to.be.a('function');
    });
    it('#validate should return an object', function () {
        var res = ffmap.validate({});

        expect(res).to.have.a.property('valid');
        expect(res.valid).to.be.a('boolean');
        expect(res).to.have.a.property('errors');
        expect(res.errors).to.be.an('array');
    });
});
