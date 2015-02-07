describe('Basic examples', function () {
    'use strict';

    var chai = require('chai');
    var expect = chai.expect;

    var ffmap = require('../index.js');

    it('should not accept numbers as valid', function () {
        var res = ffmap.validate(42);

        expect(res.valid).to.be.false;
    });
    it('should not pass an example without meta property', function () {
        var res = ffmap.validate({
            no_meta: {
            }
        });

        expect(res.valid).to.be.false;
    });
    describe('minimal metadata', function () {
        it('should pass a minimal example', function () {
            var res = ffmap.validate({
                meta: {
                    timestamp: '2014-11-09T10:46:06'
                }
            });

            expect(res.valid).to.be.true;
        });
        it('should not validate without timestamp', function () {
            var res = ffmap.validate({
                meta: {
                    something: true
                }
            });

            expect(res.valid).to.be.false;
        });
    });
});
