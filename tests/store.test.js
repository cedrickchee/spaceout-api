/* eslint-disable no-unused-vars */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const {
  downloadedFacility,
  downloadedCrowdlevel,
  setupDatabase,
} = require('./fixtures/db');

const store = require('../src/shared/db/store');

beforeEach(setupDatabase);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test storing of downloaded data', () => {
  test('Should save facility data into database', async () => {
    const result = await store.saveFacility(downloadedFacility);

    // Assertion to check the number of facilities saved
    expect(result.length).toBe(2);

    // Assertion to check if the facility is saved in the database
    expect(result[0].name).toBe(downloadedFacility[0].properties['NAME']);
  });

  test('Should save crowd level data into database', async () => {
    const result = await store.saveCrowdlevel(downloadedCrowdlevel);

    // Assertion to check the number of crowd levels saved
    expect(result.length).toBe(3);

    // Assertion to check if the crowd levels is saved in the database
    expect(result[0].id).toBe(downloadedCrowdlevel.data.facilities[0].id);
    expect(result[1].band).toBe(downloadedCrowdlevel.data.facilities[1].band);
  });
});
