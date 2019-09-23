const file = require('./file');

describe('File createInputValidation',() => {
  test('Validation Response - Should return  name is required', async () => {
      let input = {
        "type":"FILE",
        "container": "MYFILES",
        "parentId":"123"
      }
      const result = await file.createInputValidation(input);
      expect(result.message).toMatch('name is required');
  });

  test('Validation Response - Should return  type is required', async () => {
      let input = {
        "name":"file 1",
        "container": "MYFILES",
        "parentId":"123"
      }
      const result = await file.createInputValidation(input);
      expect(result.message).toMatch('type is required');
  });

  test('Validation Response - Should return  container is required', async () => {
      let input = {
        "name":"file 1",
        "type":"FILE",
        "parentId":"123"
      }
      const result = await file.createInputValidation(input);
      expect(result.message).toMatch('container is required');
  });

  test('Validation Response - Should return  name is required', async () => {
      let input = {}
      const result = await file.createInputValidation(input);
      expect(result.message).toMatch('name is required');
  });

  test('Validation Response - Should return  name is required', async () => {
      let input = {
        "name":"hello",
        "type":"FILE",
        "container": "MYFILES",
        "parent": "parent1",
        "createdBy": {"1":2}
      }
      const result = await file.createInputValidation(input);
      expect(result.message).toMatch('parent is not allowed');
  });

});

describe('File editInputValidation',() => {
  test('Validation Response - Should return  id is required', async () => {
      let input = {
        "name":"new",
        "description": "description",
        "updatedBy": "sfdfsd"
      }
      const result = await file.editInputValidation(input);
      expect(result.message).toMatch('id is required');
  });

  test('Validation Response - Should return  name is required', async () => {
      let input = {
        "id":"5d88d7f8c8d0ad1f407b7c2d",
        "description": "description",
        "updatedBy": "sfdfsd"
      }
      const result = await file.editInputValidation(input);
      expect(result.message).toMatch('name is required');
  });

  test('Validation Response - Should return  updatedBy is required', async () => {
      let input = {
        "id":"5d88d7f8c8d0ad1f407b7c2d",
        "name":"new",
        "description": "description"
      }
      const result = await file.editInputValidation(input);
      expect(result.message).toMatch('updatedBy is required');
  });

  test('Validation Response - Should return  id is required', async () => {
      let input = {}
      const result = await file.editInputValidation(input);
      expect(result.message).toMatch('id is required');
  });

  test('Validation Response - Should return  parent is required', async () => {
      let input = {
        "id":"5d88d7f8c8d0ad1f407b7c2d",
        "name":"new",
        "description": "description",
        "updatedBy": "sfdfsd",
        "parent": {}
      }
      const result = await file.editInputValidation(input);
      expect(result.message).toMatch('parent is not allowed');
  });

});

describe('File checkInInputValidation',() => {
  test('Validation Response - Should return  _id is required', async () => {
      let input = {
        "name": "checkedin",
        "updatedBy": {"1":"agil"},
        "url": "hi"
      }
      const result = await file.checkInInputValidation(input);
      expect(result.message).toMatch('_id is required');
  });

  test('Validation Response - Should return  updatedBy is required', async () => {
      let input = {
        "_id": "5d88d7f8c8d0ad1f407b7c2d",
        "name": "checkedin",
        "url": "hi"
      }
      const result = await file.checkInInputValidation(input);
      expect(result.message).toMatch('updatedBy is required');
  });

  test('Validation Response - Should return  url is required', async () => {
      let input = {
        "_id": "5d88d7f8c8d0ad1f407b7c2d",
        "updatedBy": {"1":"agil"}
      }
      const result = await file.checkInInputValidation(input);
      expect(result.message).toMatch('url is required');
  });

  test('Validation Response - Should return  _id is required', async () => {
      let input = {}
      const result = await file.checkInInputValidation(input);
      expect(result.message).toMatch('_id is required');
  });

  test('Validation Response - Should return  parent is required', async () => {
      let input = {
        "_id": "5d88d7f8c8d0ad1f407b7c2d",
        "name": "checkedin",
        "updatedBy": {"1":"agil"},
        "url": "hi",
        "parent": "12"
      }
      const result = await file.checkInInputValidation(input);
      expect(result.message).toMatch('parent is not allowed');
  });

});