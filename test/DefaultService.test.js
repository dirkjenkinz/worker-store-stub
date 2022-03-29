const { expect, test } = require('@jest/globals');
const mockingoose = require('mockingoose');
const Worker = require('../models/worker');

const {
  workersFindByHomeHomeGET,
  workersGET,
  workersPOST,
  workersPUT,
  workersWorkerIdGET,
  workersWorkerIdDELETE
} = require('../service/DefaultService');

describe('get worker by id', () => {
  it('should return 1 worker record', async () => {
    mockingoose(Worker).toReturn(
      {
        "workerId": 12345678,
        "name": 'Bridget Bardot',
        "location": {
          "latitude": '122.3232',
          "longitude": '-8.212',
        },
        "home": 'Zurich'
      }, 'findOne');
    const response = await workersWorkerIdGET(12345678);
    expect(response.name).toBe('Bridget Bardot');
  })
});

describe('remove worker from database', () => {
  it('should return 200 when worker deleted', async () => {
    mockingoose(Worker).toReturn(
      {
        code: 200, payload: undefined
      },
    );
    const response = await workersWorkerIdDELETE(12345678);
    expect(response.code).toBe(200);
  })
});

describe('get workers by home', () => {
  it('should return a list of workers living at a specified place', async () => {
    mockingoose(Worker).toReturn(
      [
        {
          "workerId": 12345678,
          "name": 'Bridget Bardot',
          "location": {
            "latitude": '122.3232',
            "longitude": '-8.212',
          },
          "home": 'Zurich'
        },
        {
          "workerId": 23456789,
          "name": 'Hugh Jarse',
          "location": {
            "latitude": '122.3232',
            "longitude": '-8.212',
          },
          "home": 'Zurich'
        }
      ], 'find');
    const response = await workersFindByHomeHomeGET(12345678);
    expect(response[1].name).toBe('Hugh Jarse');
  });
});

describe('get all workers', () => {
  it('should return a list of all workers in the workers store database', async () => {
    mockingoose(Worker).toReturn(
      [
        {
          "workerId": 12345678,
          "name": 'Bridget Bardot',
          "location": {
            "latitude": '122.3232',
            "longitude": '-8.212324',
          },
          "home": 'Zurich'
        },
        {
          "workerId": 12349876,
          "name": 'Gene Autrey',
          "location": {
            "latitude": '132.9999',
            "longitude": '-1.3456565',
          },
          "home": 'Rome'
        },
        {
          "workerId": 23456789,
          "name": 'Hugh Jarse',
          "location": {
            "latitude": '122.3232',
            "longitude": '-8.212325',
          },
          "home": 'Zurich'
        }
      ], 'find');
    const response = await workersGET(12345678);
    expect(response[1].name).toBe('Gene Autrey');
  })
});

describe('add a worker to the database', () => {
  it('should return a 200 return code', async () => {
    const body =
    {
      "workerId": 12345678,
      "name": 'Bridget Bardot',
      "location": {
        "latitude": '122.3232',
        "longitude": '-8.212',
      },
      "home": 'Zurich'
    };
    mockingoose(Worker).toReturn(
      {
        code: 200, payload: undefined
      }, 'save');
    const response = await workersPOST(body);
    expect(response.code).toBe(200);
  })
});

describe('change worker details', () => {
  it('should return a 200 return code', async () => {
    const body =
    {
      "workerId": 12345678,
      "name": 'Bridget Jones',
      "location": {
        "latitude": '20.22',
        "longitude": '-0.3443',
      },
      "home": 'London'
    };
    mockingoose(Worker).toReturn(
      {
        code: 200, payload: undefined
      }, 'findOneAndUpdate');
    const response = await workersPUT(body);
    expect(response.code).toBe(200);
  })
});