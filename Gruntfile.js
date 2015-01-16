module.exports = function (grunt) {
    grunt.config.init({
        jsck: {
            ffmap_schema: {
                options: {
                    root: grunt.file.readJSON('schema/schema_draft4.json')
                },
                src: 'schema/ffmap.json'
            },
            examples: {
                options: {
                    root: grunt.file.readJSON('schema/ffmap.json')
                },
                src: 'examples/*.json'
            }
        },
        tv4: {
            ffmap_schema: {
                options: {
                    root: grunt.file.readJSON('schema/schema_draft4.json')
                },
                src: ['schema/ffmap.json']
            },
            examples: {
                options: {
                    root: grunt.file.readJSON('schema/ffmap.json')
                },
                src: ['examples/*.json']
            }
        }
    });

    grunt.registerMultiTask('jsck', function () {
        var JSCK = require('jsck');
        var schema = this.options().root || grunt.file.readJSON('schema/schema_draft4.json');
        this.files.forEach(function (file) {
            file.src.filter(function (f) {
                return grunt.file.exists(f);
            })
            .map(function (f) {
                return grunt.file.readJSON(f);
            })
            .forEach(function (json, index) {
                var jsck = new JSCK.draft4(schema);
                try {
                    var res = jsck.validate(json);
                    if (!res.valid && res.errors) {
                        grunt.log.error('validation failed');
                        grunt.log.error(JSON.stringify(json, null, 2));
                        grunt.log.error(res.errors.join('/n'));
                        grunt.fail.fatal('Invalid document');
                    }
                    grunt.verbose.ok('Document valid:', file.src[index]);
                } catch (e) {
                    grunt.log.error('validation failed:')
                    grunt.log.error(JSON.stringify(json, null, 2));
                    grunt.log.error(e.message);
                    grunt.fail.fatal('Schema validation failed');
                }
            });
        });
        grunt.log.ok('Documents valid!');
    });

    grunt.loadNpmTasks('grunt-tv4');

    grunt.registerTask('default', ['tv4', 'jsck']);
};
