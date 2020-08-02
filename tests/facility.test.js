/* eslint-disable no-unused-vars */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  facilityOne,
  facilityTwo,
  facilityThree,
  setupDatabase,
} = require('./fixtures/db');

beforeEach(setupDatabase);

afterAll(async () => {
  await mongoose.connection.close();
});

test('Should fetch all facilities', async () => {
  const response = await request(app)
    .get('/facilities')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assertion to check the number of facilities
  expect(response.body.length).toBe(3); // can also use toEqual

  // Assertion to check if the facility is updated in the database
  expect(response.body[0].name).toBe(facilityOne.name);
});

test('Should not able to fetch facility if unauthenticated', async () => {
  await request(app).get('/facilities').send().expect(401);
});

test('Should fetch facilities by type (filtering)', async () => {
  const response = await request(app)
    .get('/facilities?type=supermarket')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assertion to check the number of facilities
  expect(response.body.length).toBe(1); // can also use toEqual

  // Assertion to check if the facility is updated in the database
  expect(response.body[0].type).toBe(facilityThree.type);
});

test('Should fetch facility by ID', async () => {
  // Assertion to fetch the facility
  const response = await request(app)
    .get(`/facilities/${facilityOne.id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.name).toBe(facilityOne.name);
});

test('Should not able to fetch facility by ID if unauthenticated', async () => {
  await request(app).get(`/facilities/${facilityOne.id}`).send().expect(401);
});

test('Shoud fetch pages of facilities (pagination)', async () => {
  const response = await request(app)
    .get('/facilities?limit=2')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});
