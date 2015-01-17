(function ffmapJSONSchema(module) {
    'use strict';

    var JSCK = require('jsck');
    var fs = require('fs');
    var path = require('path');

    var schema = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'schema/ffmap.json'))
    );

    module.exports = {
        validate: function validate(json) {
            var jsck = new JSCK.draft4(schema);
            return jsck.validate(json);
        }
    };
}(module));
