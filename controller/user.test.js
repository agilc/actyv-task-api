const user = require('./user');

describe('User createInputValidation',() => {
  test('Validation Response - Should return  authUserId is required', async () => {
      let input = {
        "name":"new",
        "email": "agil"
      }
      const result = await user.authInputValidation(input);
      expect(result.message).toMatch('authUserId is required');
  });

  test('Validation Response - Should return  email is required', async () => {
      let input = {
        "authUserId":"authUserId",
        "name":"new"
      }
      const result = await user.authInputValidation(input);
      expect(result.message).toMatch('email is required');
  });

  test('Validation Response - Should return  authUserId is required', async () => {
      let input = {}
      const result = await user.authInputValidation(input);
      expect(result.message).toMatch('authUserId is required');
  });

  test('Validation Response - Should return param is not allowed', async () => {
      let input = {
        "authUserId":"authUserId",
        "name":"new",
        "email": "agil",
        "param": "23"
      }
      const result = await user.authInputValidation(input);
      expect(result.message).toMatch('param is not allowed');
  });

});
