const mockingoose = require('mockingoose');
const Goal = require('../models/Goals'); 
const { createGoalFromForm, deleteGoal, updateGoalFromForm } = require('../controllers/goalsController'); 
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const { Types: { ObjectId } } = require('mongoose');

describe('createGoalFromForm controller', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'POST',
      url: '/userGoals/create',
      body: {
        userId: '60b8d2954f1c3b001f6e9f94',
        goalTitle: 'Workout 5 times a week',
        goalWeight: 4,
        status: 'Not Started',
        deadline: '2024-12-15T23:59:59.000Z'
      }
    });
    res = httpMocks.createResponse();
    res.redirect = jest.fn();
    mockingoose.resetAll();
  });

  it('should create a new goal and redirect', async () => {
    const newGoal = {
      _id: new ObjectId('674191687f86db1c401059a5'),
      userId: new ObjectId('60b8d2954f1c3b001f6e9f94'),
      goalTitle: 'Workout 5 times a week',
      goalWeight: 4,
      status: 'Not Started',
      createdAt: new Date('2024-11-23T08:25:12.462Z'),
      deadline: new Date('2024-12-15T23:59:59.000Z'),
      __v: 0
    };

    mockingoose(Goal).toReturn(newGoal, 'save');

    await createGoalFromForm(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/userGoals');
  });
});

describe('deleteGoal controller', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'POST',
      url: '/userGoals/remove',
      params: { id: '674191687f86db1c401059a5' }
    });
    res = httpMocks.createResponse();
    mockingoose.resetAll();
  });

  it('should delete a goal and return success message', async () => {
    const deletedGoal = {
      _id: new ObjectId('674191687f86db1c401059a5'),
      userId: new ObjectId('60b8d2954f1c3b001f6e9f94'),
      goalTitle: 'Workout 5 times a week',
      goalWeight: 4,
      status: 'Not Started',
      createdAt: new Date('2024-11-23T08:25:12.462Z'),
      deadline: new Date('2024-12-15T23:59:59.000Z'),
      __v: 0
    };

    mockingoose(Goal).toReturn(deletedGoal, 'findOneAndDelete');

    await deleteGoal(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Goal deleted successfully' });
  });
});

describe('updateGoalFromForm controller', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'POST',
      url: '/userGoals/update',
      body: {
        goalId: '674191687f86db1c401059a5',
        userId: '60b8d2954f1c3b001f6e9f94',
        goalTitle: 'Workout 5 times a week',
        goalWeight: 4,
        status: 'Not Started',
        deadline: '2024-12-15T23:59:59.000Z'
      }
    });
    res = httpMocks.createResponse();
    res.redirect = jest.fn();
    mockingoose.resetAll();
  });

  it('should update a goal and redirect', async () => {
    const updatedGoal = {
      _id: new ObjectId('674191687f86db1c401059a5'),
      userId: new ObjectId('60b8d2954f1c3b001f6e9f94'),
      goalTitle: 'Workout 5 times a week',
      goalWeight: 4,
      status: 'Not Started',
      createdAt: new Date('2024-11-23T08:25:12.462Z'),
      deadline: new Date('2024-12-15T23:59:59.000Z'),
      __v: 0
    };

    mockingoose(Goal).toReturn(updatedGoal, 'findOneAndUpdate');

    await updateGoalFromForm(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/userGoals');
  });
});
