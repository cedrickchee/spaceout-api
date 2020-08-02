// Helper functions for making HTTP request

const axios = require('axios');

const url = 'https://www.spaceout.gov.sg/graphql';

const getData = async () => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const queryGraphql = async (query) => {
  try {
    let response = await axios.post(url, {
      query,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getData,
  queryGraphql,
  url,
};
