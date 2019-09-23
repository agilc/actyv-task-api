const category = require('./category');

describe('Category createInputValidation',() => {
  test('Validation Response - Should return  name is required', async () => {
      let input = {
        "description": "description",
        "createdBy": {"name":"value"}
      }
      const result = await category.createInputValidation(input);
      expect(result.message).toMatch('name is required');
  });

  test('Validation Response - Should return  createdBy is required', async () => {
      let input = {
        "name":"hello",
        "description": "description"
      }
      const result = await category.createInputValidation(input);
      expect(result.message).toMatch('createdBy is required');
  });

  test('Validation Response - Should return  name is required', async () => {
      let input = {}
      const result = await category.createInputValidation(input);
      expect(result.message).toMatch('name is required');
  });

  test('Validation Response - Should return  name is required', async () => {
      let input = {
        "name":"hello",
        "param": "description",
        "createdBy": {"1":2}
      }
      const result = await category.createInputValidation(input);
      expect(result.message).toMatch('param is not allowed');
  });

});

describe('Category editInputValidation',() => {
  test('Validation Response - Should return  id is required', async () => {
      let input = {
        "name":"new 123",
        "description": "description",
        "updatedBy": "sfdfsd"
      }
      const result = await category.editInputValidation(input);
      expect(result.message).toMatch('id is required');
  });

  test('Validation Response - Should return  name is required', async () => {
      let input = {
        "id": "5d7f47adcd74570004c48ca3",
        "description": "description",
        "updatedBy": "sfdfsd"
      }
      const result = await category.editInputValidation(input);
      expect(result.message).toMatch('name is required');
  });

  test('Validation Response - Should return  updatedBy is required', async () => {
      let input = {
        "id": "5d7f47adcd74570004c48ca3",
        "name":"new 123",
        "description": "description"
      }
      const result = await category.editInputValidation(input);
      expect(result.message).toMatch('updatedBy is required');
  });

  test('Validation Response - Should return  id is required', async () => {
      let input = {
        "id": "5d7f47adcd74570004c48ca3",
        "name":"new 123",
        "param": "description",
        "updatedBy": "sfdfsd"
      }
      const result = await category.editInputValidation(input);
      expect(result.message).toMatch('param is not allowed');
  });

  test('Validation Response - Should return  id is required', async () => {
      let input = {}
      const result = await category.editInputValidation(input);
      expect(result.message).toMatch('id is required');
  });

});
