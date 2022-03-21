'use strict';
var utils = require('../utils/writer.js');

/**
 * returns all workers with a given home value
 *
 * home String home to search against
 * returns List
 **/
exports.workersFindByHomeGET = function (home) {
  console.log('workersFindByHomeGET');
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "workerId": 0,
      "name": "name",
      "location": {
        "latitude": 6.0274563,
        "longitude": 1.4658129
      },
      "home": "home"
    }, {
      "workerId": 0,
      "name": "name",
      "location": {
        "latitude": 6.0274563,
        "longitude": 1.4658129
      },
      "home": "home"
    }];
    if (home === 'home') {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve(new utils.respondWithCode(400,));
    }
  });
}


/**
 * Returns all workers from the worker store
 *
 * returns List
 **/
exports.workersGET = function () {
  console.log('workersGET');
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "workerId": 0,
      "name": "Jimmy Jewel",
      "location": {
        "latitude": 3.3627422,
        "longitude": 2.1234567
      },
      "home": "Swindon"
    }, {
      "workerId": 0,
      "name": "Sweeney Todd",
      "location": {
        "latitude": 3.0274563,
        "longitude": 2.4658129
      },
      "home": "Swindon"
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve(new utils.respondWithCode(400,));
    }
  });
}


/**
 * Adds a new worker to the worker store, returns the worker record
 *
 * body Worker Worker object that needs to be added to the store (optional)
 * returns Worker
 **/
exports.workersPOST = function (body) {
  console.log('workersPost');
  console.log('body=', body);
  return new Promise(function (resolve, reject) {
    let examples = {};
    examples['application/json'] = {
      "workerId": body.workerId,
      "name": body.name,
      "location": {
        "latitude": body.location.latitude,
        "longitude": body.location.longitude,
      },
      "home": body.home
    };
    switch (body.workerId) {
      case 21882100:
        resolve(new utils.respondWithCode(200,));
        break;
      case 78112351:
        resolve(new utils.respondWithCode(400,));    // Invalid id
        break;
      default:
        if (Object.keys(examples).length > 0) {
          console.log(examples[Object.keys(examples)[0]])
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
    }
  });
}


/**
 * Update an existing worker record
 *
 * body Worker Complete Worker object with workerId (optional)
 * returns Worker
 **/
exports.workersPUT = function (body) {
  console.log('workersPUT')
  let examples = {};
  examples['application/json'] = {
    "workerId": body.workerId,
    "name": body.name,
    "location": {
      "latitude": body.location.latitude,
      "longitude": body.location.longitude,
    },
    "home": body.home
  };
  return new Promise(function (resolve, reject) {
    switch (body.workerId) {
      case 21882000:
        resolve(new utils.respondWithCode(200,));
        break;
      case 78112351:
        resolve(new utils.respondWithCode(400,));    // Invalid id
        break;
      case 218820099:
        resolve(new utils.respondWithCode(401,));    // Invalid input
        break;
      case 21882202:
        resolve(new utils.respondWithCode(404,));    // worker not found
        break;
      default:
        console.log(examples[Object.keys(examples)[0]])
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
    }
  });
}


/**
 * deletes a single worker
 *
 * workerId Long Id of worker to delete
 * no response value expected for this operation
 **/
exports.workersWorkerIdDELETE = function (workerId) {
  console.log('workersWorkerIdDELETE');
  console.log('workerId=', workerId);
  return new Promise(function (resolve, reject) {
    switch (workerId) {
      case 21882000:
        resolve(new utils.respondWithCode(200,));
        break;
      case 218820099:
        resolve(new utils.respondWithCode(400,));    // Invalid id
        break;
      case 21882002:
        resolve(new utils.respondWithCode(404,));    // worker not found
        break;
      default:
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
    }
  });
}


/**
 * returns a single worker
 *
 * workerId Long Id of worker to return
 * returns Worker
 **/
exports.workersWorkerIdGET = function (workerId) {
  console.log('workersWorkerIdGET');
  return new Promise(function (resolve, reject) {
    let examples = {};
    examples['application/json'] = {
      "workerId": 21822000,
      "name": "John Silver",
      "location": {
        "latitude": 6.0274563,
        "longitude": 1.4658129
      },
      "home": "Las Vegas"
    };
    switch (workerId) {
      case 21882000:
        resolve(examples[Object.keys(examples)[0]]);
        break;
      case 218820099:
        resolve(new utils.respondWithCode(400,));    // Invalid id
        break;
      case 21882002:
        resolve(new utils.respondWithCode(404,));    // worker not found
        break;
      default:
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
    }
  });
}
