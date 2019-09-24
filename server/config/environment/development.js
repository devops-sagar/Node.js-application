'use strict';
// Development specific configuration
// ==================================
var PATH = require('path');
var fs = require('fs');
var rootPath = PATH.resolve(__dirname,'../../');
let uploadPath = PATH.resolve(__dirname,'../../../uploads/posts');
module.exports = {
    server: {
        port: 9005,
        host: '127.0.0.1',
        publicName: 'http://localhost:9005'
    },
    files: {
        posts: uploadPath,
        url: 'http://localhost:9005/posts/'
    },
};