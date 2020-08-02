// Data downloader

const decrypt = require('../shared/encryption/decrypt');
const httpClient = require('../shared/http/client');

const downloadFacilities = async () => {
  const res = await httpClient.queryGraphql('{ geojsonPoint }');

  const facilityData = res.data.data.geojsonPoint;
  const decrypted = decrypt(facilityData);
  const decryptedJson = JSON.parse(decrypted);

  return decryptedJson.jsonstring.features;
};

const downloadCrowdLevels = async () => {
  const res = await httpClient.queryGraphql(
    '{ facilities { id, band, createdAt, trend } }',
  );

  return res.data;
};

module.exports = {
  downloadFacilities,
  downloadCrowdLevels,
};
