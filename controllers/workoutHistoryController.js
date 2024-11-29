const WorkoutHistory = require('../models/workoutHistoryModel');
const { Types } = require('mongoose');
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

    // res.status(200).json(history);
    res.render('history', {historyData: history})
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
  deleteWeight
};
