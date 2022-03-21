const { expect, test } = require('@jest/globals');
const {
  workersFindByHomeGET,
  workersGET,
  workersPOST,
  workersPUT
} = require('../service/DefaultService');

const homeList = [{
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

const allWorkers = [{
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

const worker = {
  "workerId": 'id',
  "name": 'name',
  "location": {
    "latitude": 'latitude',
    "longitude": 'longitude',
  },
  "home": 'home'
};

describe('Find workers by home', () => {
  it('should return a partial list of workers', async () => {
    const response = await workersFindByHomeGET('home');
    expect(response).toEqual(homeList);
  });
});

describe('Return workers from the worker store', () => {
  it('should return a list of all workers', async () => {
    const response = await workersGET();
    expect(response).toEqual(allWorkers);
  });
});

describe('Add worker to the worker store', () => {
  it('should return 200 when id = 21882100', async () => {
    worker.workerId = 21882100;
    const response = await workersPOST(worker);
    expect(response.code).toEqual(200);
  });
  it('should return 400 when id is invalid', async () => {
    worker.workerId = 78112351;
    const response = await workersPOST(worker);
    expect(response.code).toEqual(400);
  });
  it('should return worker details when id is valid', async () => {
    worker.workerId = 12345678;
    const response = await workersPOST(worker);
    expect(response).toEqual(worker);
  });
})

describe('Update worker details', () => {
  it('should return 200 when id = 21882000', async () => {
    worker.workerId = 21882000;
    const response = await workersPUT(worker);
    expect(response.code).toEqual(200);
  });
  it('should return 400 when id is invalid', async () => {
    worker.workerId = 78112351;
    const response = await workersPUT(worker);
    expect(response.code).toEqual(400);
  });
  it('should return 401 when input is invalid', async () => {
    worker.workerId = 218820099;
    const response = await workersPUT(worker);  
    expect(response.code).toEqual(401);
  });
  it('should return 404 when worker is not found', async () => {
    worker.workerId = 21882202;
    const response = await workersPUT(worker);
    expect(response.code).toEqual(404);
  });
  it('should return worker details when id is valid', async () => {
    worker.workerId = 12345678;
    const response = await workersPUT(worker);
    expect(response).toEqual(worker);
  });
})