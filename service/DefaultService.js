'use strict';
const utils = require('../utils/writer.js');
const Worker = require('../models/worker');
const { logger } = require('../utils/logger.js');

/**
 * returns all workers with a given home value
 *
 * home String home to search against
 * returns List
 **/
exports.workersFindByHomeHomeGET = function (home) {
  logger.info('workersFindByHomeGET');
  logger.debug('home='+home);
  return new Promise(async (resolve, reject) => {
    try {
      const worker = await Worker.find({ home: home });
      resolve(worker);
    } catch (err) {
      logger.error(err)
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
  logger.info('workersGET');
  return new Promise(async (resolve, reject) => {
    try {
      const workers = await Worker.find();
      resolve(workers);
    } catch (err) {
      logger.error(err);
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
  logger.info('workersPost');
  logger.debug('body=', body);
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
      logger.error(err);
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
  logger.info('workersPUT');
  return new Promise(async (resolve, reject) => {
    try {
      const id = body.workerId.toString();
      await Worker.findOneAndUpdate(
        { workerId: id },
        { $set: { home: body.home } },
        { new: true }
      );
      await Worker.findOneAndUpdate(
        { workerId: id },
        { $set: { name: body.name } },
        { new: true }
      );
      const resp = await Worker.findOneAndUpdate(
        { workerId: id },
        { $set: { location: body.location } },
        { new: true }
      );
      logger.info('updated record='+resp)
      resolve(new utils.respondWithCode(200,));
    } catch (err) {
      logger.error('error='+err);
      reject(new utils.respondWithCode(500,));
    }
  });
};

/**
 * deletes a single worker
 *
 * workerId Long Id of worker to delete
 * no response value expected for this operation
 **/
exports.workersWorkerIdDELETE = (workerId) => {
  logger.info('workersWorkerIdDELETE');
  logger.debug('workerId='+workerId)
  return new Promise(async (resolve, reject) => {
    try {
      const worker = await Worker.find({ workerId: workerId })
      if (worker.length === 0) {
        resolve(new utils.respondWithCode(404,));
      };
      await Worker.deleteOne({ workerId: workerId });
      resolve(new utils.respondWithCode(200,));
    } catch (err) {
      logger.error(err)
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
  logger.info('workersWorkerIdGET');
  logger.debug('workerId='+workerId);
  return new Promise(async (resolve, reject) => {
    try {
      const worker = await Worker.findOne({ workerId: workerId });
      if (worker.length === 0) {
        resolve(new utils.respondWithCode(404,));
      }
      resolve(worker);
    } catch (err) {
      logger.error(err)
      reject(new utils.respondWithCode(500,));
    }
  });
}
