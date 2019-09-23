const dept = require('./dept');

describe('Department createInputValidation',() => {
  test('Validation Response - Should return  name is required', async () => {
      let input = {
        "description": "description",
        "admins":[],
        "createdBy": {"name": "value"}
      }
      const result = await dept.createInputValidation(input);
      expect(result.message).toMatch('name is required');
  });

  test('Validation Response - Should return  admins is required', async () => {
      let input = {
        "name":"category1",
        "description": "description",
        "createdBy": {"name": "value"}
      }
      const result = await dept.createInputValidation(input);
      expect(result.message).toMatch('admins is required');
  });

  test('Validation Response - Should return  createdBy is required', async () => {
      let input = {
        "name":"category1",
        "description": "description",
        "admins":[]
      }
      const result = await dept.createInputValidation(input);
      expect(result.message).toMatch('createdBy is required');
  });

  test('Validation Response - Should return  name is required', async () => {
      let input = {}
      const result = await dept.createInputValidation(input);
      expect(result.message).toMatch('name is required');
  });

  test('Validation Response - Should return  descript is required', async () => {
      let input = {
        "name":"hell 1o",
        "descript": "description",
        "admins":[],
        "createdBy": {"name": "value"}
      }
      const result = await dept.createInputValidation(input);
      expect(result.message).toMatch('descript is not allowed');
  });

});

describe('Department editInputValidation',() => {
  test('Validation Response - Should return  name is required', async () => {
      let input = {
        "name":"new",
        "description": "description",
        "updatedBy": "sfdfsd",
        "admins": []
      }
      const result = await dept.editInputValidation(input);
      expect(result.message).toMatch('id is required');
  });

  test('Validation Response - Should return  name is required', async () => {
      let input = {
        "id":"5d7f47a3cd74570004c48ca2",
        "description": "description",
        "updatedBy": "sfdfsd",
        "admins": []
      }
      const result = await dept.editInputValidation(input);
      expect(result.message).toMatch('name is required');
  });

  test('Validation Response - Should return  admins is required', async () => {
      let input = {
        "id":"5d7f47a3cd74570004c48ca2",
        "name":"new",
        "description": "description",
        "updatedBy": "sfdfsd"
      }
      const result = await dept.editInputValidation(input);
      expect(result.message).toMatch('admins is required');
  });

  test('Validation Response - Should return  updatedBy is required', async () => {
      let input = {
        "id":"5d7f47a3cd74570004c48ca2",
        "name":"new",
        "description": "description",
        "admins": []
      }
      const result = await dept.editInputValidation(input);
      expect(result.message).toMatch('updatedBy is required');
  });

  test('Validation Response - Should return  name is required', async () => {
      let input = {}
      const result = await dept.editInputValidation(input);
      expect(result.message).toMatch('id is required');
  });

  test('Validation Response - Should return  descript is required', async () => {
      let input = {
        "id":"5d7f47a3cd74570004c48ca2",
        "name":"new",
        "description": "description",
        "updatedBy": "sfdfsd",
        "admins": [],
        "param": "value"
      }
      const result = await dept.editInputValidation(input);
      expect(result.message).toMatch('param is not allowed');
  });

});