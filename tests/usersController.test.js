// const request = require('supertest');
// const express = require('express');
// const router = require('../routes/index.js'); 
// const app = express();

// app.use(router);

// // Mock controller functions to avoid hitting actual database 
// jest.mock('../controllers/goalsController', () => ({
//   createGoal: jest.fn((req, res) => res.status(201).send('Goal created')),
//   getGoals: jest.fn((req, res) => res.status(200).json([{ id: 1, goal: 'Run a marathon' }])),
//   getGoalById: jest.fn((req, res) => res.status(200).json({ id: req.params.id, goal: 'Run a marathon' })),
//   updateGoal: jest.fn((req, res) => res.status(200).send('Goal updated')),
//   deleteGoal: jest.fn((req, res) => res.status(200).send('Goal deleted')),
// }));

// jest.mock('../controllers/usersController', () => ({
//   renderLogin: jest.fn((req, res) => res.status(200).render('login')),
//   renderRegister: jest.fn((req, res) => res.status(200).render('register')),
//   getUsers: jest.fn((req, res) => res.status(200).json([{ id: 1, name: 'John Adams' }])),
//   getUser: jest.fn((req, res) => res.status(200).json({ id: req.params.id, name: 'John Adams' })),
//   createUser: jest.fn((req, res) => res.status(201).send('User created')),
//   deleteUser: jest.fn((req, res) => res.status(200).send('User deleted')),
//   updateUser: jest.fn((req, res) => res.status(200).send('User updated')),
// }));

// jest.mock('../controllers/workoutHistoryController', () => ({
//   createHistory: jest.fn((req, res) => res.status(201).send('History created')),
//   getAllHistory: jest.fn((req, res) => res.status(200).json([{ id: 1, workout: 'Squats' }])),
//   getHistory: jest.fn((req, res) => res.status(200).json({ id: req.params.id, workout: 'Squats' })),
//   updateHistory: jest.fn((req, res) => res.status(200).send('History updated')),
//   deleteHistory: jest.fn((req, res) => res.status(200).send('History deleted')),
//   addWeight: jest.fn((req, res) => res.status(201).send('Weight added')),
//   getWeight: jest.fn((req, res) => res.status(200).json({ weight: '100kg' })),
//   getAllWeights: jest.fn((req, res) => res.status(200).json([{ weight: '100kg' }])),
//   updateWeight: jest.fn((req, res) => res.status(200).send('Weight updated')),
//   deleteWeight: jest.fn((req, res) => res.status(200).send('Weight deleted')),
// }));

// jest.mock('../controllers/workoutsControlller', () => ({
//   createWorkout: jest.fn((req, res) => res.status(201).send('Workout created')),
//   getWorkoutsByUserId: jest.fn((req, res) => res.status(200).json([{ id: 1, workout: 'Squats' }])),
//   deleteWorkoutById: jest.fn((req, res) => res.status(200).send('Workout deleted')),
//   updateWorkoutById: jest.fn((req, res) => res.status(200).send('Workout updated')),
// }));




// describe('Routes', () => {


//     describe('Homepage Route', () => {
//         it('should render the homepage', async () => {
//           const response = await request(app).get('/');
//           expect(response.text).toContain('Welcome to Lift Logger'); 
//         });
//       });


//   describe('Goals Routes', () => {
//     it('should create a goal', async () => {
//       const response = await request(app).post('/goals').send({ goal: 'Run a marathon' });
//       expect(response.status).toBe(201);
//       expect(response.text).toBe('Goal created');
//     });

//     it('should get all goals', async () => {
//       const response = await request(app).get('/goals');
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual([{ id: 1, goal: 'Run a marathon' }]);
//     });

//     it('should get a goal by ID', async () => {
//       const response = await request(app).get('/goals/1');
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({ id: '1', goal: 'Run a marathon' });
//     });

//     it('should update a goal', async () => {
//       const response = await request(app).put('/goals/1').send({ goal: 'Complete a marathon' });
//       expect(response.status).toBe(200);
//       expect(response.text).toBe('Goal updated');
//     });

//     it('should delete a goal', async () => {
//       const response = await request(app).delete('/goals/1');
//       expect(response.status).toBe(200);
//       expect(response.text).toBe('Goal deleted');
//     });
//   });

//   describe('Users Routes', () => {
//     it('should render login page', async () => {
//       const response = await request(app).get('/users/login');
//       expect(response.status).toBe(200);
//     });

//     it('should render register page', async () => {
//       const response = await request(app).get('/users/register');
//       expect(response.status).toBe(200);
//     });

//     it('should get all users', async () => {
//       const response = await request(app).get('/users');
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual([{ id: 1, name: 'John Adams' }]);
//     });

//     it('should create a user', async () => {
//       const response = await request(app).post('/users').send({ name: 'Jane Adams' });
//       expect(response.status).toBe(201);
//       expect(response.text).toBe('User created');
//     });

//     it('should delete a user', async () => {
//       const response = await request(app).delete('/users/1');
//       expect(response.status).toBe(200);
//       expect(response.text).toBe('User deleted');
//     });

//     it('should update a user', async () => {
//       const response = await request(app).put('/users/1').send({ name: 'Jane Adams Updated' });
//       expect(response.status).toBe(200);
//       expect(response.text).toBe('User updated');
//     });
//   });

//   describe('Workout History Routes', () => {
//     it('should create workout history', async () => {
//       const response = await request(app).post('/history').send({ workout: 'Squats' });
//       expect(response.status).toBe(201);
//       expect(response.text).toBe('History created');
//     });

//     it('should get all workout history', async () => {
//       const response = await request(app).get('/history');
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual([{ id: 1, workout: 'Squats' }]);
//     });

//     it('should update workout history', async () => {
//       const response = await request(app).put('/history/1').send({ workout: 'Push-ups' });
//       expect(response.status).toBe(200);
//       expect(response.text).toBe('History updated');
//     });

//     it('should delete workout history', async () => {
//       const response = await request(app).delete('/history/1');
//       expect(response.status).toBe(200);
//       expect(response.text).toBe('History deleted');
//     });
//   });

//   describe('Workouts Routes', () => {
//     it('should create a workout', async () => {
//       const response = await request(app).post('/workouts').send({ workout: 'Squats' });
//       expect(response.status).toBe(201);
//       expect(response.text).toBe('Workout created');
//     });

//     it('should get workouts by user ID', async () => {
//       const response = await request(app).get('/workouts/user/1');
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual([{ id: 1, workout: 'Squats' }]);
//     });

//     it('should delete a workout', async () => {
//       const response = await request(app).delete('/workouts/1');
//       expect(response.status).toBe(200);
//       expect(response.text).toBe('Workout deleted');
//     });

//     it('should update a workout', async () => {
//       const response = await request(app).put('/workouts/1').send({ workout: 'Push-ups' });
//       expect(response.status).toBe(200);
//       expect(response.text).toBe('Workout updated');
//     });
//   });
// });
