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
                src: ['spec/fixtures/**/*.json']
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
                src: ['spec/fixtures/**/*.json']
            }
        },
        mochacli: {
            spec: {
                options: {
                    reporter: 'spec'
                },
                files: [{
                    src: ['spec/**/*_spec.js']
                }]
            }
        },
        watch: {
            sources: {
                files: ['schema/*.json', 'spec/**/*.json', 'index.js', 'spec/**/*.js'],
                tasks: ['default']
            },
            config: {
                options: {
                    reload: true
                },
                files: ['Gruntfile.js'],
                tasks: ['default']
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
                        grunt.verbose.writeln(JSON.stringify(json, null, 2));
                        grunt.log.error(JSON.stringify(res.errors, null, 2));
                        grunt.fail.fatal('Invalid document');
                    }
                    grunt.verbose.ok('Document valid:', file.src[index]);
                } catch (e) {
                    grunt.log.error('validation failed:')
                    grunt.verbose.error(JSON.stringify(json, null, 2));
                    grunt.log.error(e.message);
                    grunt.fail.fatal('Schema validation failed');
                }
            });
        });
        grunt.log.ok('Documents valid!');
    });

    grunt.loadNpmTasks('grunt-tv4');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['tv4', 'jsck', 'mochacli']);
};
