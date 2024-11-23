const Goal = require('../models/Goals');
const mongoose = require('mongoose');

async function createGoal(req, res) {
    try { 
        const goal = new Goal(req.body);
        const savedGoal = await goal.save();
        res.status(201).json({message: "Goal created successfully", goal: savedGoal});
    } catch (error) {
        console.error("Error creating a goal", error);
        res.status(400).json({error: error.message});
    }
}

async function getGoals(req, res) {
    try {
        const goals = await Goal.find();
        if (goals.length === 0) { 
            return res.status(204).json({message: "No goals found"});
        }
        res.status(200).json(goals);
    } catch (error) { 
        console.error("Error getting the goals:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

async function getGoalById(req, res) { 
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({error: "Invalid Goal ID"});
    }

    try { 
        const goal = await Goal.findById(userId);
        if (!goal) {
            return res.status(404).json({message: "Goal not found"});
        }
        res.status(200).json(goal);
    } catch (error) {
        console.error("Error getting goal: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}

async function updateGoal(req, res) {
    const goalId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(goalId)) {
        return res.status(400).json({error: "Invalid Goal ID"});
    }

    try {
        const updatedGoal = await Goal.findByIdAndUpdate(
            goalId, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedGoal) {
            return res.status(404).json({message: "Goal not found"});
        }

        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error updating goal:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

async function deleteGoal(req, res) {
    const goalId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(goalId)) {
        return res.status(400).json({error: "Invalid Goal ID"});
    }

    try {
        const deletedGoal = await Goal.findByIdAndDelete(goalId);

        if (!deletedGoal) {
            return res.status(404).json({message: "Goal not found"});
        }

        res.status(200).json({message: "Goal deleted successfully"});
    } catch (error) {
        console.error("Error deleting goal:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    createGoal,
    getGoals,
    getGoalById,
    updateGoal,
    deleteGoal,
};
