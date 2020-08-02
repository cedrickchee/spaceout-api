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

module.exports = {
  get: jest.fn((url) => {
    return Promise.resolve(data);
  }),
  post: jest.fn((url) => {
    return Promise.resolve(data);
  }),
  create: jest.fn(() => {
    return this;
  }),
};
