module.exports = function (grunt) {
    grunt.config.init({
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

    grunt.loadNpmTasks('grunt-tv4');

    grunt.registerTask('default', ['tv4']);
};
