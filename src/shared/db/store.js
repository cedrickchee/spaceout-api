// Data store

const Facility = require('../../models/facility');
const Crowdlevel = require('../../models/crowdlevel');

const saveFacility = async (data) => {
  let arrFacility = [];
  data.forEach((feature) => {
    const properties = feature.properties;
    const geometry = feature.geometry;
    const location = {
      type: geometry.type,
      coordinates: [geometry.coordinates[0] || 0, geometry.coordinates[1] || 0],
    };

    arrFacility.push({
      id: properties['ID'],
      name: properties['NAME'],
      type: properties['TYPE'],
      sat: properties['SAT'],
      sun: properties['SUN'],
      weekday: properties['WEEKDAY'],
      extra: properties['EXTRA'],
      address: properties['ADDRESS'],
      cbclosed: properties['CBCLOSED'],
      ggwFlag: properties['GGW_FLAG'],
      blkHouse: properties['BLK_HOUSE'],
      roadName: properties['ROAD_NAME'],
      otherName: properties['OTHER_NAME'],
      postalcode: isNaN(properties['POSTALCODE'])
        ? 0
        : properties['POSTALCODE'],
      oprHrsMonday: properties['OPR_HRS_MONDAY'],
      oprHrsTuesday: properties['OPR_HRS_TUESDAY'],
      oprHrsWednesday: properties['OPR_HRS_WEDNESDAY'],
      oprHrsThurday: properties['OPR_HRS_THURSDAY'],
      oprHrsFriday: properties['OPR_HRS_FRIDAY'],
      oprHrsSaturday: properties['OPR_HRS_SATURDAY'],
      oprHrsSundayPh: properties['OPR_HRS_SUNDAY_PH'],
      location,
    });
  });

  try {
    // First, remove all documents from the facilities collection.
    await Facility.deleteMany({});

    // Then, bulk insert documents.
    const result = await Facility.insertMany(arrFacility);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const saveCrowdlevel = async (data) => {
  const crowdData = data.data.facilities;

  let arrCrowdlevel = [];
  crowdData.forEach((crowdlevel) => {
    arrCrowdlevel.push({
      id: crowdlevel.id,
      band: crowdlevel.band,
      createdAt: crowdlevel.createdAt,
      trend: crowdlevel.trend,
    });
  });

  try {
    // Bulk insert documents.
    const result = Crowdlevel.insertMany(arrCrowdlevel);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveFacility,
  saveCrowdlevel,
};
