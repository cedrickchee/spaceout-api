const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Facility = require('../../src/models/facility');
const Crowdlevel = require('../../src/models/crowdlevel');

// User data

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mike@example.com',
  password: '98!what!!!',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'Ming Yen',
  email: 'mingyen@example.com',
  password: '289!dev!!!',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

// Facility data

const facilityOne = {
  _id: new mongoose.Types.ObjectId(),
  location: {
    coordinates: [103.849989789705, 1.29134759710259],
    type: 'Point',
  },
  id: '2aa081f9b7e69d9bf77405b233027495',
  name: 'FUNAN',
  type: 'MALL',
  sat: null,
  sun: null,
  weekday: null,
  extra: null,
  address: null,
  cbclosed: null,
  ggwFlag: null,
  blkHouse: '107',
  roadName: 'NORTH BRIDGE ROAD',
  otherName: null,
  postalcode: 179105,
  oprHrsMonday: null,
  oprHrsTuesday: null,
  oprHrsWednesday: null,
  oprHrsThurday: null,
  oprHrsFriday: null,
  oprHrsSaturday: null,
  oprHrsSundayPh: null,
};

const facilityTwo = {
  _id: new mongoose.Types.ObjectId(),
  location: {
    coordinates: [103.989077549803, 1.3603410066651],
    type: 'Point',
  },
  id: '4b94f4acabd7a277e99aa4668c1b5eb3',
  name: 'JEWEL CHANGI AIRPORT',
  type: 'MALL',
  sat: null,
  sun: null,
  weekday: null,
  extra: null,
  address: null,
  cbclosed: null,
  ggwFlag: null,
  blkHouse: '78',
  roadName: 'AIRPORT BOULEVARD',
  otherName: null,
  postalcode: 819666,
  oprHrsMonday: null,
  oprHrsTuesday: null,
  oprHrsWednesday: null,
  oprHrsThurday: null,
  oprHrsFriday: null,
  oprHrsSaturday: null,
  oprHrsSundayPh: null,
};

const facilityThree = {
  _id: new mongoose.Types.ObjectId(),
  location: {
    coordinates: [103.9405980015, 1.352180469],
    type: 'Point',
  },
  id: '301',
  name: 'NTUC FairPrice - Tampines HUB',
  type: 'SUPERMARKET',
  sat: null,
  sun: null,
  weekday: null,
  extra: null,
  address: '1 TAMPINES WALK OUR TAMPINES HUB,  #B1-01',
  cbclosed: null,
  ggwFlag: null,
  blkHouse: null,
  roadName: null,
  otherName: null,
  postalcode: 528523,
  oprHrsMonday: null,
  oprHrsTuesday: null,
  oprHrsWednesday: null,
  oprHrsThurday: null,
  oprHrsFriday: null,
  oprHrsSaturday: null,
  oprHrsSundayPh: null,
};

// Crowdlevel data

const crowdlevelOne = {
  _id: new mongoose.Types.ObjectId(),
  id: '340',
  band: 0,
  createdAt: new Date('2020-07-30T12:48:00.000Z'),
  trend: false,
};

const crowdlevelTwo = {
  _id: new mongoose.Types.ObjectId(),
  id: 'e34e75b769de81c5ed95812e7c3ef12d',
  band: 1,
  createdAt: new Date('2020-07-30T09:00:00.000Z'),
  trend: false,
};

const crowdlevelThree = {
  _id: new mongoose.Types.ObjectId(),
  id: 'e34e75b769de81c5ed95812e7c3ef12d',
  band: 1,
  createdAt: new Date('2020-07-30T08:00:00.000Z'),
  trend: false,
};

const crowdlevelFour = {
  _id: new mongoose.Types.ObjectId(),
  id: '369305ba-5a95-4786-a325-2d92309e85f8',
  band: 2,
  createdAt: new Date('2020-07-30T12:50:00.000Z'),
  trend: false,
};

const crowdlevelFive = {
  _id: new mongoose.Types.ObjectId(),
  id: '369305ba-5a95-4786-a325-2d92309e85f8',
  band: 1,
  createdAt: new Date('2020-01-30T09:30:00.000Z'),
  trend: false,
};

// Facility Data Downloaded From API

const downloadedFacility = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [103.760139846504, 1.38032239850188],
    },
    properties: {
      ID: '254d8a8161f70956efaef0fe9b766126',
      SAT: null,
      SUN: null,
      NAME: 'JUNCTION 10',
      TYPE: 'MALL',
      EXTRA: null,
      ADDRESS: null,
      WEEKDAY: null,
      CBCLOSED: null,
      GGW_FLAG: null,
      BLK_HOUSE: '1',
      ROAD_NAME: 'WOODLANDS ROAD',
      OTHER_NAME: null,
      POSTALCODE: '677899',
      OPR_HRS_FRIDAY: null,
      OPR_HRS_MONDAY: null,
      OPR_HRS_TUESDAY: null,
      OPR_HRS_SATURDAY: null,
      OPR_HRS_THURSDAY: null,
      OPR_HRS_SUNDAY_PH: null,
      OPR_HRS_WEDNESDAY: null,
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [103.955036732427, 1.37691410184641],
    },
    properties: {
      ID: 'ece0239e34f49f8169c5b97039daa9ae',
      SAT: null,
      SUN: null,
      NAME: 'DOWNTOWN EAST',
      TYPE: 'MALL',
      EXTRA: null,
      ADDRESS: null,
      WEEKDAY: null,
      CBCLOSED: null,
      GGW_FLAG: null,
      BLK_HOUSE: '1',
      ROAD_NAME: 'PASIR RIS CLOSE',
      OTHER_NAME: null,
      POSTALCODE: '519599',
      OPR_HRS_FRIDAY: null,
      OPR_HRS_MONDAY: null,
      OPR_HRS_TUESDAY: null,
      OPR_HRS_SATURDAY: null,
      OPR_HRS_THURSDAY: null,
      OPR_HRS_SUNDAY_PH: null,
      OPR_HRS_WEDNESDAY: null,
    },
  },
];

// Crowd Levels Data Downloaded From API

const downloadedCrowdlevel = {
  data: {
    facilities: [
      {
        id: '340',
        band: 0,
        createdAt: '01 August 2020, 12:48 PM',
        trend: false,
      },
      {
        id: 'ff0dc8871f455dbd2c084f99fe9794f2',
        band: 0,
        createdAt: '01 August 2020, 09:30 AM',
        trend: false,
      },
      {
        id: 'feaabfb3-6350-458c-ab2b-25947f94986f',
        band: 0,
        createdAt: '01 August 2020, 12:38 PM',
        trend: false,
      },
    ],
  },
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Facility.deleteMany();
  await Crowdlevel.deleteMany();

  await new User(userOne).save();
  await new User(userTwo).save();

  await new Facility(facilityOne).save();
  await new Facility(facilityTwo).save();
  await new Facility(facilityThree).save();

  await new Crowdlevel(crowdlevelOne).save();
  await new Crowdlevel(crowdlevelTwo).save();
  await new Crowdlevel(crowdlevelThree).save();
  await new Crowdlevel(crowdlevelFour).save();
  await new Crowdlevel(crowdlevelFive).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  facilityOne,
  facilityTwo,
  facilityThree,
  crowdlevelOne,
  crowdlevelTwo,
  crowdlevelThree,
  crowdlevelFour,
  crowdlevelFive,
  downloadedFacility,
  downloadedCrowdlevel,
  setupDatabase,
};
