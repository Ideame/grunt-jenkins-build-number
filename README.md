grunt-jenkins-build-number
==========================

> Retrieves the latest build number/state from Jenkins.

## Getting Started
_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) guide._

From the same directory as your project's Gruntfile and package.json, install this plugin with the following command:

```bash
npm install grunt-jenkins-build-number
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-jenkins-build-number');
```

## Overview

Inside your `Gruntfile.js` file add a section named `jenkinsBuildNumber`. This section specifies the
options to provide the build state you want, the project name and the credentials if Jenkins
server has authentication enabled.

Allowed build states are:

* lastBuild **(default)**
* lastCompletedBuild
* lastFailedBuild
* lastStableBuild
* lastSuccessfulBuild
* lastUnstableBuild
* lastUnsuccessfulBuild

## Config Example

Example to tag a new successful version based on the latest build number and environment:

```javascript
jenkinsBuildNumber: {
    dist: {
        options: {
            hostname: 'jenkins.mycompany.com',
            port: 8080, //defaults to 80 if none chosen
            state: 'lastSuccessfulBuild',
            username: process.env.JENKINS_USERNAME,
            password: process.env.JENKINS_PASSWORD,
            projectName: 'myproject-' + process.env.ENVIRONMENT
        }
    }
},
```

License
-------

Copyright (c) 2013 Juan Pablo Garcia
Licensed under the MIT license.
