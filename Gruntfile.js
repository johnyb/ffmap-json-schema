module.exports = function (grunt) {
    grunt.config.init({
        tv4: {
            options: {
                root: grunt.file.readJSON('schema/schema_draft4.json')
            },
            ffmap_schema: {
                src: ['schema/ffmap.json']
            }
        }
    });

    grunt.loadNpmTasks('grunt-tv4');

    grunt.registerTask('default', ['tv4']);
};
