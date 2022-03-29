'use strict';

const path = require('path');
const http = require('http');

const mongoose = require('mongoose');
const url = 'mongodb://localhost/WorkerDBex';
mongoose.connect(url);

const oas3Tools = require('oas3-tools');
const { logger } = require('./utils/logger');
const serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    logger.info('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    logger.info('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

