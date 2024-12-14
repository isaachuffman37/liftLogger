const mockingoose = require('mockingoose');
const Workout = require('../models/Workouts');
const WorkoutHistory = require('../models/workoutHistoryModel');
const { createHistoryFromForm, updateHistoryFromForm } = require('../controllers/workoutHistoryController');
const httpMocks = require('node-mocks-http');
const { Types: { ObjectId } } = require('mongoose');
const utils = require('../utilities');

describe('createHistoryFromForm controller', () => {
    let req, res;
  
    beforeEach(() => {
      req = httpMocks.createRequest({
        method: 'POST',
        url: '/userHistory/create',
        body: {
          userId: '6740f8f63aceb7616f759d50',
          workoutId: '674118f7d30b235f4328dc49',
          weights: [
            { exerciseName: '67411a6e61b176f13db3b748', weight: 15 },
            { exerciseName: '6741221e6e60045992f55299', weight: 60 }
          ]
        }
      });
      res = httpMocks.createResponse();
      res.redirect = jest.fn();
      req.flash = jest.fn();
      mockingoose.resetAll();
    });
  
    it('should create a new history and redirect', async () => {
      const exercises = [
        { _id: new ObjectId('67411a6e61b176f13db3b748'), exerciseName: 'Lateral Raises' },
        { _id: new ObjectId('6741221e6e60045992f55299'), exerciseName: 'Cable Pulldown' }
      ];
  
      mockingoose(Workout).toReturn(exercises, 'aggregate');
  
      const newHistory = {
        _id: new ObjectId('674118f7d30b235f4328dc4a'),
        userId: new ObjectId('6740f8f63aceb7616f759d50'),
        workoutId: new ObjectId('674118f7d30b235f4328dc49'),
        date: new Date('2024-11-22T23:51:10.915Z'),
        weights: [
          { exerciseName: 'Lateral Raises', weight: 15, _id: new ObjectId('67411a6e61b176f13db3b748') },
          { exerciseName: 'Cable Pulldown', weight: 60, _id: new ObjectId('6741221e6e60045992f55299') }
        ],
        __v: 0
      };
  
      mockingoose(WorkoutHistory).toReturn(newHistory, 'save');
  
      await createHistoryFromForm(req, res);
  
      expect(res.redirect).toHaveBeenCalledWith('/userHistory');
    });
  });
  