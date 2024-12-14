const Goal = require('../models/Goals');
const mongoose = require('mongoose');
const utilites = require("../utilities/index")

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
        res.status(200).json(goals)
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
        // res.status(200).json(goal);
        res.render('goals', { goalData: utilites.buildGoal(goal) })
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

async function userGoalsView(req, res) {
    const userId = req.user.id
    
    try {
        
        const goals = await Goal.find({ userId: userId });

        // if (goals.length === 0) { 
        //     return res.status(204).json({message: "No goals found"});
        // }
        console.log(userId)
        let goalMarkup = goals.reduce((acc, goal) => acc + utilites.buildGoal(goal), "")

        res.render('goals', { 
            title: "Goals",
            goalData: goalMarkup 
        });
    } catch (error) { 
        console.error("Error getting the goals:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

async function createGoalsView(req, res) {
    const userId = req.user.id
    try {
        res.render('addGoal', { 
            title: "Create Goal",
            userId
        });
    } catch (error) { 
        console.error("Error getting the goals:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

async function updateGoalView(req, res) {
    const userId = req.user.id
    const goalId = req.params.goalId
    const goalData = await Goal.findById(goalId)

    console.log(goalData)
    try {
        res.render("updateGoal", {
            title: "Updating Goal",
            goalId: goalId,
            userId: userId,
            goalTitle: goalData.goalTitle,
            goalWeight: goalData.goalWeight,
            status: goalData.status,
            deadline: new Date(goalData.deadline).toISOString().split("T")[0]
        })
    } catch (error) {
        console.error("Error updating a goal", error);
        res.status(400).json({error: error.message});
    }
}

async function createGoalFromForm(req, res) {
    try { 
        const goal = new Goal(req.body);
        const savedGoal = await goal.save();
        res.redirect("/userGoals")
    } catch (error) {
        console.error("Error creating a goal", error);
        // res.status(400).json({error: error.message});
        req.flash("notice", error.message)
        res.redirect("/userGoals/create")
    }
}

async function updateGoalFromForm(req, res) {
    const goalId = req.body.goalId;

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

        res.redirect("/userGoals");
    } catch (error) {
        console.error("Error updating goal:", error);
        // res.status(500).json({error: "Internal server error"});
        req.flash("notice", error.message)
        res.redirect(`/userGoals`)
    }
}

async function deleteGoalView(req, res) {
    const userId = req.user.id
    const goalId = req.params.goalId
    const goalData = await Goal.findById(goalId)

    console.log(goalData)
    try {
        res.render("removeGoal", {
            title: "Deleting Goal",
            goalId: goalId,
            userId: userId,
            goalTitle: goalData.goalTitle,
            goalWeight: goalData.goalWeight,
            status: goalData.status,
            deadline: new Date(goalData.deadline).toISOString().split("T")[0]
        })
    } catch (error) {
        console.error("Error updating a goal", error);
        res.status(400).json({error: error.message});
    }
}

async function deleteGoalFromForm(req, res) {
    const goalId = req.body.goalId;

    if (!mongoose.Types.ObjectId.isValid(goalId)) {
        return res.status(400).json({error: "Invalid Goal ID"});
    }

    try {
        const deletedGoal = await Goal.findByIdAndDelete(goalId);

        if (!deletedGoal) {
            return res.status(404).json({message: "Goal not found"});
        }

        res.redirect("/userGoals")
    } catch (error) {
        console.error("Error deleting goal:", error);
        req.flash("notice", error.message)
        res.redirect(`/userGoals`)
    }
}

module.exports = {
    createGoal,
    getGoals,
    getGoalById,
    updateGoal,
    updateGoalView,
    deleteGoal,
    deleteGoalView,
    createGoalsView,
    userGoalsView,
    createGoalFromForm,
    updateGoalFromForm,
    deleteGoalFromForm
};
