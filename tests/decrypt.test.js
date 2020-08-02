const decrypt = require('../src/shared/encryption/decrypt');

test('Should decrypt and get plain text', async () => {
  const plainText = decrypt(
    '02ae1cd0bb265e727c6d7ca115e9205d:6cb6ec79d9e677ef70e885d68e2487d5',
  );

  expect(plainText).toBe('spaceout api');
});
