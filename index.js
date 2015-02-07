(function ffmapJSONSchema(module) {
    'use strict';

    var JSCK = require('jsck');
    var fs = require('fs');
    var path = require('path');

    var rootSchema = {
        id: '#',
        '$ref': 'urn:ffmap#'
    };
    var schemas = [
        JSON.parse(
            fs.readFileSync(path.join(__dirname, 'schema/geojson/geometry.json'))
        ),
        //ffmap needs geojson geometry
        JSON.parse(
            fs.readFileSync(path.join(__dirname, 'schema/ffmap.json'))
        )
    ];

    module.exports = {
        validate: function validate(json) {
            var jsck = new JSCK.draft4();
            schemas.forEach(function (schema) {
                jsck.add(schema);
            });
            //load the root schema which actually references urn:ffmap#
            jsck.add(rootSchema);

            return jsck.validate(json);
        }
    };
}(module));
