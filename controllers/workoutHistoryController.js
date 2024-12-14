const WorkoutHistory = require('../models/workoutHistoryModel');
const Workout = require("../models/Workouts")
const { Types, default: mongoose } = require('mongoose');
const utils = require('../utilities');
require('dotenv').config();

// No proper error handling since I believe we're going to 
// implement some kind of global error handling later on. 

// Since the history data has its own id, I'm going to assume
// that the userId and workoutId will be passed within the body
// of the HTTP request.
const createHistory = async (req, res) => {
    let userId = req.body.userId;
    let workoutId = req.body.workoutId;

    // const createdAt = new Date().toISOString();
    
    // userId = new Types.ObjectId();
    // workoutId = new Types.ObjectId();

    // Validate IDs
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(workoutId)) {
        return res.status(400).send(`userId (${userId}) and/or workoutId (${workoutId}) invalid`);
    }

    //  mongoose.connect(DB_URI)
    const history = new WorkoutHistory({
        userId: userId,
        workoutId: workoutId,
    })

    history.save().then(() => {
        res.status(201).send(`workout history successfully created: ${history._id}`);
    }).catch(error => {
        res.status(400).send(`something went wrong. ${error}`);
    });
};

// Not quite sure if this is the best way to structure it,
// but I'm assuming the /history route will list
// all of the history documents once requested
const getAllHistory = async (req, res) => {
    // With route as GET /history/
    const history = await WorkoutHistory.find({});

    res.status(200).json(history);
};

const getHistory = async (req, res) => {
    const id = req.params.id;

     //Verify that the id is valid
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).send(`specified id ${id} is not a valid ObjectId`)
    }

    const history = await WorkoutHistory.findById(id);
    if (!history) return res.status(404).send("could not find document");

    res.status(200).json(history);
    // res.render('history', {historyData: history})
};

const updateHistory = async (req, res) => {
    // With route as GET /history/:id
    const id = req.params.id;

    //Verify that the id is valid
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).send(`specified id ${id} is not a valid ObjectId`)
    }

    // Verify that the id exists within the document
    const document = await WorkoutHistory.findById(id)
    if (!document) return res.status(400).send('could not find document')

    const history = await WorkoutHistory.findByIdAndUpdate(id, req.body).then(() => {
        res.status(200).send('data updated successfully');
    }).catch(error => {
        res.status(400).send(`something went wrong. ${error}`)
    });
};

const deleteHistory = async (req, res) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).send(`specified id ${id} is not a valid ObjectId`)
    }

    const history = await WorkoutHistory.findByIdAndDelete(id).then(() => {
        res.status(204).send('data deleted successfully');
    }).catch(error => {
        res.status(400).send(`something went wrong. ${error}`)
    });
};

// Controller logic for doing operations on sub documents
// Where route looks like /history/:id/
const addWeight = async (req, res) => {
    const id = req.params.id;
    
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).send(`specified id ${id} is not a valid ObjectId`)
    }

    const history = await WorkoutHistory.findById(id);
    if (!history) return res.status(400).send('could not find document')

    let entryId = new Types.ObjectId();

    history.weights.push({
        _id: entryId,
        exerciseName: req.body.exerciseName,
        weight: req.body.weight
    })

    await history.save();

    res.status(201).send(`entry successfully created. id: ${ entryId }`);
}

const getWeight = async (req, res) => {
    const id = req.params.id;
    const subId = req.params.subid;

    //Verify that the id and subid are valid
    if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(subId)) {
        return res.status(400).send(`specified id ${id} and/or subId ${subId} are not a valid ObjectId`)
    }

    const history = await WorkoutHistory.findById(id);
    if (!history) res.status(400).send('could not find document');

    const document = await history.weights.id(subId)
    if (!document) return res.status(400).send('could not find subdocument');

    res.status(200).json(document);
}

const getAllWeights = async (req, res) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).send(`specified id ${id} is not a valid ObjectId`)
    }

    const history = await WorkoutHistory.findById(id);
    if (!history) return res.status(400).send('could not find document');

    res.status(200).json(history.weights);
}

const updateWeight = async (req, res) => {
    const id = req.params.id;
    const subId = req.params.subid;

    //Verify that the id and subid are valid
    if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(subId)) {
        return res.status(400).send(`specified id ${id} and/or subId ${subId} are not a valid ObjectId`)
    }

    const history = await WorkoutHistory.findById(id);
    if (!history) return res.status(400).send('could not find document');

    const document = await history.weights.id(subId)
    if (!document) return res.status(400).send('could not find subdocument');

    document.set({
        exerciseName: req.body.exerciseName.toString(),
        weight: Number.parseFloat(req.body.weight)
    })

    await history.save();

    res.status(200).send("subdocument sucessfully updated");
}

const deleteWeight = async (req, res) => {
    const id = req.params.id
    const subId = req.params.subid

    //Verify that the id and subid are valid
    if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(subId)) {
        return res.status(400).send(`specified id ${id} and/or subId ${subId} are not a valid ObjectId`)
    }

    const history = await WorkoutHistory.findById(id)
    if (!history) return res.status(400).send('could not find document');

    const document = history.weights.id(subId)
    if (!document) return res.status(400).send("could not find subdocument");

    document.deleteOne();
    await history.save()

    res.sendStatus(204);
}

async function userHistoryView(req, res) {
    try {
        const userId = req.user.id
        //Verify that the id is valid
        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).send(`specified id ${userId} is not a valid ObjectId`)
        }

        const history = await WorkoutHistory.find({ userId: userId });
        if (!history) return res.status(404).send("could not find document");

        const historyMarkup = await utils.buildHistoryDataFromWorkoutHistory(history)

        // res.status(200).json(history);
        res.render('history', {
            title: "History",
            history: historyMarkup
        })
    } catch (error) {
        console.error(error)
    }
}

async function createHistoryView(req, res) {
    try {
        const userId = req.user.id
        const userIdObj = mongoose.Types.ObjectId.createFromHexString(userId)
        const workoutData = await Workout.aggregate([
            {
                $match: { "userId": userIdObj }
            },
            { 
                $project: {
                    _id: 1,
                    workoutName: 1,
                }
            }
        ])

        const workoutSelectList = utils.buildWorkoutSelectList(workoutData)

        res.render("addHistory", {
            title: "Create History",
            userId: userId,
            workoutSelectList: workoutSelectList
        })
    } catch (error) {
        console.error(error)
    }
}

async function createHistoryFromForm(req, res) {
    try {
        if (!req.body.weights) {
            throw Error("No weights for workout found.")
        }
        
        req.body.weights = await Promise.all(req.body.weights.map(async (weight) => {
            const exerciseId = mongoose.Types.ObjectId.createFromHexString(weight.exerciseName)
            const exercises = await Workout.aggregate([
                { $unwind: "$exercises" },
                { $match: { "exercises._id": exerciseId } },
                { $replaceRoot: {
                    newRoot: "$exercises"
                } }
            ])

            if (exercises) {
                return { exerciseName: exercises[0].exerciseName, weight: weight.weight }
            } else {
                return undefined
            }
        }))

        const history = await new WorkoutHistory(req.body)
        await history.save()
        
        if (history) {
            res.redirect("/userHistory")
        } else {
            res.redirect("/userHistory/create")
        }
    } catch (error) {
        console.error(error)
        req.flash("notice", error.message)
        res.redirect("/userHistory/create")
    }
}

async function updateHistoryView(req, res) {
    try {
        const { historyId, weightId } = req.params
        const history = await WorkoutHistory.findById(historyId)
        const document = await history.weights.id(weightId)
        const workout = await Workout.findById(history.workoutId)
        const exerciseSelect = await utils.buildSelectFromExercises(workout.exercises, "exerciseName", document.exerciseName)

        res.render("updateHistory", {
            title: `Update ${ workout.workoutName } History`,
            weightId: weightId,
            historyId: historyId,
            exerciseSelect: exerciseSelect,
            weight: document.weight
        })
    } catch (error) {
        console.error(error)
    }
}

async function updateHistoryFromForm(req, res) {
    try {
        const { historyId, weightId, exerciseName, weight } = req.body
        const history = await WorkoutHistory.findById(historyId)
        const document = await history.weights.id(weightId)

        document.set({
            exerciseName: exerciseName,
            weight: Number.parseFloat(weight)
        })

        await history.save()
        res.redirect("/userHistory")
    } catch (error) {
        console.error(error)
        req.flash("notice", error.message)
        res.redirect(`/userHistory`)
    }
}

async function deleteHistoryCardView(req, res) {
    try {
        const { historyId, weightId } = req.params
        const history =  await WorkoutHistory.findById(historyId)
        const document = await history.weights.id(weightId)

        res.render("removeHistoryCard", {
            title: "Remove History Card",
            historyId,
            weightId,
            exerciseName: document.exerciseName,
            weight: document.weight,
        })
    } catch (error) {
        console.error(error)
    }
}

async function deleteHistoryView(req, res) {
    try {
        const { historyId, weightId } = req.params
        const history =  await WorkoutHistory.findById(historyId)
        const workout = await Workout.findById(history.workoutId)

        res.render("removeHistory", {
            title: "Remove History",
            historyId,
            workoutName: workout.workoutName
        })
    } catch (error) {
        console.error(error)
    }
}

async function deleteHistoryCardFromForm(req, res) {
    try {
        const { historyId, weightId } = req.body
        const history =  await WorkoutHistory.findById(historyId)
        const document = await history.weights.id(weightId)
        
        document.deleteOne()
        history.save()

        res.redirect("/userHistory")
    } catch (error) {
        console.error(error)
        req.flash("notice", error.message)
        res.redirect(`/userHistory`)
    }
}

async function deleteHistoryFromForm(req, res) {
    try {
        const { historyId } = req.body
        
        await WorkoutHistory.findByIdAndDelete(historyId)

        res.redirect("/userHistory")
    } catch (error) {
        console.error(error)
        req.flash("notice", error.message)
        res.redirect(`/userHistory`)
    }
}

module.exports = {
  createHistory,
  getHistory,
  getAllHistory,
  updateHistory,
  deleteHistory,
  addWeight,
  getWeight,
  getAllWeights,
  updateWeight,
  deleteWeight,

  createHistoryView,
  userHistoryView,
  updateHistoryView,
  deleteHistoryCardView,
  deleteHistoryView,

  createHistoryFromForm,
  updateHistoryFromForm,
  deleteHistoryCardFromForm,
  deleteHistoryFromForm,
};
