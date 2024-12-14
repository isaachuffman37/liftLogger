const mockingoose = require('mockingoose');
const Workout = require('../models/Workouts');
const { createWorkoutFromForm, updateWorkoutFromForm } = require('../controllers/workoutsControlller');
const httpMocks = require('node-mocks-http');
const { Types: { ObjectId } } = require('mongoose');

describe('createWorkoutFromForm controller', () => {
    let req, res;
  
    beforeEach(() => {
      req = httpMocks.createRequest({
        method: 'POST',
        url: '/userWorkouts',
        body: {
          userId: '6740f8f63aceb7616f759d50',
          workoutName: 'Morning Routine',
          exercises: [
            { exerciseName: 'Push Ups', reps: 10, sets: 3 },
            { exerciseName: 'Squats', reps: 15, sets: 3 }
          ]
        }
      });
      res = httpMocks.createResponse();
      res.redirect = jest.fn();
      req.flash = jest.fn();
      mockingoose.resetAll();
    });
  
    it('should create a new workout and redirect', async () => {
      const newWorkout = new Workout({
        _id: new ObjectId(),
        userId: new ObjectId('6740f8f63aceb7616f759d50'),
        workoutName: 'Morning Routine',
        exercises: [
          { exerciseName: 'Push Ups', reps: 10, sets: 3, _id: new ObjectId() },
          { exerciseName: 'Squats', reps: 15, sets: 3, _id: new ObjectId() }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      mockingoose(Workout).toReturn(newWorkout, 'save');
  
      await createWorkoutFromForm(req, res);
  
      expect(newWorkout).toBeDefined();
      expect(newWorkout.userId.toString()).toEqual('6740f8f63aceb7616f759d50');
      expect(newWorkout.exercises).toEqual(expect.arrayContaining([
        expect.objectContaining({ exerciseName: 'Push Ups', reps: 10, sets: 3 }),
        expect.objectContaining({ exerciseName: 'Squats', reps: 15, sets: 3 })
      ]));
      expect(res.redirect).toHaveBeenCalledWith('/userWorkouts');
    });

    it('should handle validation errors and redirect to creation page', async () => {
      req.body.workoutName = ''; 
      const errorMessage = 'Workout validation failed';

      mockingoose(Workout).toReturn(new Error(errorMessage), 'save');

      await createWorkoutFromForm(req, res);

      expect(req.flash).toHaveBeenCalledWith('notice', expect.stringContaining(errorMessage));
      expect(res.redirect).toHaveBeenCalledWith('/userWorkouts/create');
    });

    it('should handle database errors and redirect to creation page', async () => {
      const errorMessage = 'Database error';

      mockingoose(Workout).toReturn(new Error(errorMessage), 'save');

      await createWorkoutFromForm(req, res);

      expect(req.flash).toHaveBeenCalledWith('notice', expect.stringContaining(errorMessage));
      expect(res.redirect).toHaveBeenCalledWith('/userWorkouts/create');
    });
});
