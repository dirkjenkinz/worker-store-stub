'use strict';
const utils = require('../utils/writer.js');
const GeoLocation = require('../models/geoLocation');
const Worker = require('../models/worker');

/**
 * returns all workers with a given home value
 *
 * home String home to search against
 * returns List
 **/
exports.workersFindByHomeHomeGET = function (home) {
  console.log('workersGET');
  return new Promise(async (resolve, reject) => {
    try {
      const worker = await Worker.find({ home: home })
      resolve(worker);
    } catch (err) {
      console.log(err)
      reject(new utils.respondWithCode(500,));
    }
  });
};

/**
 * Returns all workers from the worker store
 *
 * returns List
 **/
exports.workersGET = async () => {
  console.log('workersGET');
  return new Promise(async (resolve, reject) => {
    try {
      const workers = await Worker.find();
      resolve(workers);
    } catch (err) {
      console.log(err);
      reject(new utils.respondWithCode(500,));
    }
  });
}


/**
 * Adds a new worker to the worker store, returns the worker record
 *
 * body Worker Worker object that needs to be added to the store (optional)
 * returns Worker
 **/
exports.workersPOST = (body) => {
  console.log('workersPost');
  console.log(body)
  return new Promise(async (resolve, reject) => {
    const GeoLocation = {
      "latitude": body.location.latitude,
      "longitude": body.location.longitude
    }
    const worker = new Worker({
      "workerId": body.workerId,
      "name": body.name,
      "location": GeoLocation,
      "home": body.home
    });
    try {
      await worker.save();
      resolve(new utils.respondWithCode(200,));
    } catch (err) {
      console.log(err);
      reject(new utils.respondWithCode(500,));
    }
  });
}

/**
 * Update an existing worker record
 *
 * body Worker Complete Worker object with workerId (optional)
 * returns Worker
 **/
exports.workersPUT = (body) => {
  console.log('workersPUT')
console.log('body=', body);
  return new Promise(async (resolve, reject) => {
    const updatedRecord = new Worker({
      "workerId": body.workerId,
      "name": body.name,
      "location": {
        "latitude": body.location.latitude,
        "longitude": body.location.longitude,
      },
      "home": body.home
    })
    const worker = await Worker.find({ workerId: body.workerId });

    try {
      console.log(updatedRecord);

      await Worker.findOneAndUpdate({_id: worker._id}, updatedRecord, {
        new: true
      });

      resolve(new utils.respondWithCode(200,));
    } catch (err) {
      console.log(err);
      reject(new utils.respondWithCode(500,));
    }
  });
}

/**
 * deletes a single worker
 *
 * workerId Long Id of worker to delete
 * no response value expected for this operation
 **/
exports.workersWorkerIdDELETE = (workerId) => {
  console.log('workersWorkerIdDELETE');
  return new Promise(async (resolve, reject) => {
    try {
      const worker = await Worker.find({ workerId: workerId })
      console.log('worker=', worker);
      if (worker.length === 0) {
        resolve(new utils.respondWithCode(404,));
      };
      await Worker.deleteOne({ workerId: workerId });
      resolve(workerId);
    } catch (err) {
      console.log(err)
      reject(new utils.respondWithCode(500,));
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
  return new Promise(async (resolve, reject) => {
    try {
      const worker = await Worker.find({ workerId: workerId });
      if (worker.length === 0) {
        resolve(new utils.respondWithCode(404,));
      }
      resolve(worker);
    } catch (err) {
      console.log(err)
      reject(new utils.respondWithCode(500,));
    }
  });
}
