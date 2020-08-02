/* eslint-disable no-unused-vars */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Facility = require('../src/models/facility');
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  facilityOne,
  facilityTwo,
  facilityThree,
  crowdlevelOne,
  crowdlevelTwo,
  crowdlevelThree,
  crowdlevelFour,
  crowdlevelFive,
  setupDatabase,
} = require('./fixtures/db');

beforeEach(setupDatabase);

afterAll(async () => {
  await mongoose.connection.close();
});

test('Should fetch facilities and associated crowd "band"', async () => {
  const response = await request(app)
    .get('/crowdlevels?start=2020-07-25&end=2020-08-01')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assertion to check the number of crowd "band"
  expect(response.body.length).toBe(3);

  // Assertion to check the total and average crowd band for one facility.
  let obj = response.body.find((o) => o._id === crowdlevelTwo.id);
  expect(obj.total).toEqual(2);
  expect(obj.average).toEqual(1.0);
});

test('Should fetch the latest data point for each facility', async () => {
  const response = await request(app)
    .get('/crowdlevels')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assertion to check the number of crowd "band"
  expect(response.body.length).toBe(3);

  // Assertion to check if the crowd "band" is updated in the database
  expect(response.body[0].id).toBe(crowdlevelFour.id);

  // Assertion to check if the crowd "band" createdAt is equal
  expect(new Date(response.body[0].createdAt)).toEqual(
    crowdlevelFour.createdAt,
  );
  expect(new Date(response.body[1].createdAt)).toEqual(crowdlevelTwo.createdAt);
});

test('Should not able to fetch crowd "band" if unauthenticated', async () => {
  await request(app).get('/crowdlevels').send().expect(401);
});
