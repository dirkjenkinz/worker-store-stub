'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.workersFindByHomeHomeGET = function workersFindByHomeHomeGET (req, res, next, home) {
  Default.workersFindByHomeHomeGET(home)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.workersGET = function workersGET (req, res, next) {
  Default.workersGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.workersPOST = function workersPOST (req, res, next, body) {
  Default.workersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.workersPUT = function workersPUT (req, res, next, body) {
  Default.workersPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.workersWorkerIdDELETE = function workersWorkerIdDELETE (req, res, next, workerId) {
  Default.workersWorkerIdDELETE(workerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.workersWorkerIdGET = function workersWorkerIdGET (req, res, next, workerId) {
  Default.workersWorkerIdGET(workerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
