const axios = require('axios');

const httpClient = require('../src/shared/http/client');

describe('queryGraphql', () => {
  test('query successfully data from an API', async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: '1',
            title: 'a',
          },
          {
            objectID: '2',
            title: 'b',
          },
        ],
      },
    };

    const res = httpClient.queryGraphql('{ geojsonPoint }');
    await expect(res).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(httpClient.url, {
      query: '{ geojsonPoint }',
    });
  });
});
