/*
 * grunt-jenkins-build-number
 * https://github.com/Ideame/grunt-jenkins-build-number
 *
 * Copyright (c) 2013 Ideame
 */
module.exports = function (grunt) {
    var util = require('util');

    grunt.registerMultiTask("jenkinsBuildNumber", "Retrieves the latest build number/state from Jenkins.", function () {
        var http = require('http');

        var done = this.async();
        var options = this.options({
            state: 'lastBuild',
            path: ''
        });
				
        var url = {
            host: options.hostname,
            port: options.port || 80,
            path: util.format('%s/job/%s/%s/buildNumber', options.path, options.projectName, options.state)
        };

        if (options.username && options.password) {
            url.auth = util.format('%s:%s', options.username, options.password);
        }

        http.get(url, function (res) {
            if (res.statusCode !== 200) {
                return done(new Error('Could not get latest successful build version, statusCode:' + res.statusCode));
            }

            grunt.verbose.writeln('GET %s:%s%s', url.host, url.port, url.path);
            var body = '';
            res.on('data', function (chunk) { body += chunk; });
            res.on('end', function () {
                grunt.verbose.writeln('%s is: %s', options.state, body);
                grunt.config.set(options.state, body);
                done();
            });
        }).on('error', function (err) {
            done(err);
        });
    });
};
