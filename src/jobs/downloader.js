// Data downloader

const decrypt = require('../shared/encryption/decrypt');
const httpClient = require('../shared/http/client');

const downloadFacilities = async () => {
  const res = await httpClient.queryGraphql('{ geojsonPoint }');

  // res.data is string: { data: { geojsonPoint: 'xxxxxxxxxxxxx:xxxxxxxxxxxxxx ...' }}
  const facilityData = res.data.data.geojsonPoint;
  const decrypted = decrypt(facilityData);
  // decrypted is string: {"jsonstring":{"type":"FeatureCollection","features":[{...}, {...}, ...]}}
  const decryptedJson = JSON.parse(decrypted);
  // console.log('Decrypted data:', decryptedJson.jsonstring.features[0]);

  return decryptedJson.jsonstring.features;
};

const downloadCrowdLevels = async () => {
  const res = await httpClient.queryGraphql(
    '{ facilities { id, band, createdAt, trend } }',
  );

  // res.data is JSON: { data: { facilities: [[Object], [Object], ...] }
  return res.data;
};

module.exports = {
  downloadFacilities,
  downloadCrowdLevels,
};
