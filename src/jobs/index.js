// Schedule jobs to be run on the server.

const CronJob = require('cron').CronJob;

const { downloadFacilities, downloadCrowdLevels } = require('./downloader');
const store = require('../shared/db/store');

const cronTime = `*/${process.env.CRON_TIME} * * * *`;

// Job for fetching and download facilities data from data API every X minute
// (default to 30 minutes) and store the data into a local database.
const facilitiesJob = new CronJob(cronTime, async () => {
  console.log('Running facilities cron job');
  const data = await downloadFacilities();
  await store.saveFacility(data);
  console.log('Done saving facilities data');
});

// Job for fetching and download crowd levels data from data API every X minute
// (default to 30 minutes) and store the data into a local database.
const crowdLevelsJob = new CronJob(cronTime, async () => {
  console.log('Running crowd levels cron job');
  const data = await downloadCrowdLevels();
  await store.saveCrowdlevel(data);
  console.log('Done saving crowd levels data');
});

const startJobs = () => {
  facilitiesJob.start();
  crowdLevelsJob.start();
};

module.exports = {
  startJobs,
};
