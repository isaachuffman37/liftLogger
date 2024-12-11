const Workout = require("../models/Workouts")
let utils = {}


const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "short",
    hour12: true,
})

// Creating this to support the creation of multiple goals at once.
utils.buildGoal = (goalData) => {
    let html = "<div class=\"goal-card\">"
    html += `<h3>${ goalData.goalTitle }</h3>`
    html += `<a href="/userGoals/update/${ goalData._id }">Modify</a>`
    html += `<a href="/userGoals/remove/${ goalData._id }">Delete</a>`
    html += "<ul>"
    html += `<li>Weight: <span>${ goalData.goalWeight }</span></li>`
    html += `<li>Status: <span>${ goalData.status }</span></li>`
    html += `<li>Deadline: <span>${ timeFormatter.format(goalData.deadline) }</span></li>`
    html += "</ul></div>"

    return html
}

// Build local fieldsets
utils.buildWorkoutFieldsets = (exerciseData) => {
    let html = ""
    console.log(exerciseData)
    if (exerciseData) {
        for (let index = 0; index < exerciseData.length; index ++) {
            html += "<fieldset>"
            html += `<legend>Exercise  ${ index + 1 }</legend>`
            html += `<label>Name<input type="text" name="exercises[${ index }][exerciseName]" id="exercises[${ index }][exerciseName]" value="${ exerciseData[index].exerciseName }" required></label>`
            html += `<label>Reps<input type="number" name="exercises[${ index }][reps]" id="exercises[${ index }][reps]" value="${ exerciseData[index].reps }" required></label>`
            html += `<label>Sets<input type="number" name="exercises[${ index }][sets]" id="exercises[${ index }][sets]" value="${ exerciseData[index].sets }" required></label>`
            html += "</fieldset>"
        }
    }

    return html
}

// Build local fieldsets
utils.buildReadonlyWorkoutFieldsets = (exerciseData) => {
    let html = ""
    console.log(exerciseData)
    if (exerciseData) {
        for (let index = 0; index < exerciseData.length; index ++) {
            console.log(exerciseData[index])
            html += "<fieldset>"
            html += `<legend>Exercise  ${ index + 1 }</legend>`
            html += `<label>Name<input type="text" value="${ exerciseData[index].exerciseName }" readonly></label>`
            html += `<label>Reps<input type="number" value="${ exerciseData[index].reps }" readonly></label>`
            html += `<label>Sets<input type="number" value="${ exerciseData[index].sets }" readonly></label>`
            html += "</fieldset>"
        }
    }

    return html
}

utils.buildWorkoutSelectList = (workoutData) => {
    let html = `<label>Workout<select name="workoutId" id="workoutId">`

    for (let i = 0; i < workoutData.length; i++) {
        const { _id, workoutName } = workoutData[i]
        html += `<option value="${ _id }" ${ i == 0 ? "selected" : "" }>${ workoutName }</option>`
    }

    html += "</select></label>"

    return html
}

utils.buildHistoryDataFromWorkoutHistory = async (workoutData) => {
    let html = "<li class=\"history-list\">"
    // html += "<h2>Workout History<h2>"

    for (const history of workoutData) {
        const workout = await Workout.findById(history.workoutId)

        if (!workout) continue

        html += "<div class=\"history-card\">"
        html += `<h2>${ workout.workoutName }</h2>`
        html += `<a href="/userHistory/remove/${ history._id }">Delete History</a>`

        if (history.weights.length > 0) {
            for (let i = 0; i < history.weights.length; i++) {
                html += `<h4>Exercise: ${ history.weights[i].exerciseName }</h4>`
                html += `<p>Weight: ${ history.weights[i].weight }</p>`
                html += `<a href="/userHistory/update/${ history._id }/${ history.weights[i]._id }">Modify</a>`
                html += `<a href="/userHistory/remove/${ history._id }/${ history.weights[i]._id }">Delete</a>`
            }
        } else {
            html += `<h4>No weights found for this workout.</h4>`
        }

        html += "</div>"
    }

    html += "</li>"

    return html
}

module.exports = utils