describe('Basic examples', function () {
    'use strict';

    var chai = require('chai');
    var expect = chai.expect;

    var ffmap = require('../index.js');

    it('should not accept numbers as valid', function () {
        var res = ffmap.validate(42);

        expect(res.valid).to.be.false;
    });
    it('should pass a minimal example', function () {
        var res = ffmap.validate({
            timestamp: ''
        });

        expect(res.valid).to.be.true;
    });
});
