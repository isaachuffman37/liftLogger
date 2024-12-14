const mockingoose = require('mockingoose');
const User = require('../models/userModel'); 
const { updateUser } = require('../controllers/usersController'); 
const httpMocks = require('node-mocks-http');
const { Types: { ObjectId } } = require('mongoose');

describe('updateUser controller', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'POST',
      url: '/users/updateUser',
      user: { id: '675d2aa416dca1bd299aa72d' }, 
      body: { displayName: 'Bankula' } 
    });
    res = httpMocks.createResponse();
    res.render = jest.fn();  
    mockingoose.resetAll();
  });

  it('should update user display name', async () => {
    const updatedUser = {
      _id: new ObjectId('675d2aa416dca1bd299aa72d'),
      googleId: '110112159302643949790',
      displayName: 'Bankula',
      firstName: 'Bane',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocLNRTrmyVoKcMnJ53OOyfG_8tFXMYkAaF1CFGvwHIMeETqF=s96-c'
    };

    mockingoose(User).toReturn(updatedUser, 'findOneAndUpdate');

    await updateUser(req, res);

    const renderArgs = res.render.mock.calls[0][1];
    expect(renderArgs.userData.displayName).toEqual('Bankula');
    expect(renderArgs.successMessage).toEqual('Your display name has been updated successfully!');
  });

  it('should return 400 if display name is not provided', async () => {
    req.body.displayName = '';

    await updateUser(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'Display name is required' });
  });

  it('should return 404 if user ID is invalid', async () => {
    req.user.id = 'invalidUserId';

    await updateUser(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: 'Id invalid' });
  });

  it('should return 400 if no user is found', async () => {
    req.user.id = '675d2aa416dca1bd299aa72d';
    mockingoose(User).toReturn(null, 'findOneAndUpdate');

    await updateUser(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: 'No such user' });
  });
});
