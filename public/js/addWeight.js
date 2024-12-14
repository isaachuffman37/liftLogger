const workoutFields = document.getElementById("weight-fields")
const addWorkoutButton = document.getElementById("add-weight")
const workoutSelect = document.getElementById("workoutId")

let currentExercises

async function fetchExerciseDataFromId(id) {
    if (!id) {
        return false
    }

    const response = await fetch(`/workouts/exercises/${id}`)
    
    if (response.ok) {
        const data = await response.json()
        return data
    }

    return false
}

function buildSelectFromExercises(exercises, name, select) {
    let html = `<select name="${name}" required>`
    html += "<option value=\"\" selected disabled hidden>Choose Exercise</option>"
    
    for (const exercise of exercises) {
        html += `<option value="${exercise._id}" ${select == exercise.exerciseName ? "Selected" : "" }>${exercise.exerciseName}</option>`
    }

    html += "</select>"
    return html
}

async function onMainSelectChanged() {
    const value = this.value
    workoutFields.innerHTML = ""

    if (!value) {
        return
    }

    fetch(`/workouts/${value}`).then(async response => {
        const workoutData = await response.json()
        
        if (workoutData) {
            currentExercises = workoutData.exercises

            workoutData.exercises.forEach(exercise => {
                const childElements = workoutFields.childElementCount + 1
                const exerciseSelect = buildSelectFromExercises(workoutData.exercises, `weights[${childElements}][exerciseName]`, exercise.exerciseName)
                addExerciseField(exerciseSelect)
            })
        }
    })
}

async function addExerciseField(exerciseSelect) {
    const childElements = workoutFields.childElementCount + 1
    let fieldSet = document.createElement("fieldset")
    
    let html = ""
    html += `<legend>Weight ${ childElements }</legend>`
    html += `<label>Name${ exerciseSelect ? exerciseSelect : `<input type="text" name="weights[${childElements}][exerciseName]" required>` }</label>`
    html += `<label>Reps<input type="number" class="js-reps" readonly></label>`
    html += `<label>Sets<input type="number" class="js-sets" readonly></label>`
    html += `<label>Weight<input type="number" name="weights[${childElements}][weight]" required></label>`

    fieldSet.innerHTML += html
    workoutFields.appendChild(fieldSet)

    const select = fieldSet.querySelector("select")
    select.addEventListener("change", async () => {
        const data = await fetchExerciseDataFromId(select.value)
        const reps = fieldSet.getElementsByClassName("js-reps")
        const sets = fieldSet.getElementsByClassName("js-sets")

        if (data && reps.length > 0 && sets.length > 0) {
            reps[0].value = data.reps
            sets[0].value = data.sets
        }
    })

    // Initialize values for reps and sets from predetermined workouts
    if (select.value) {
        const data = await fetchExerciseDataFromId(select.value)
        const reps = fieldSet.getElementsByClassName("js-reps")
        const sets = fieldSet.getElementsByClassName("js-sets")

        if (data && reps.length > 0 && sets.length > 0) {
            reps[0].value = data.reps
            sets[0].value = data.sets
        }
    }

    const button = document.createElement("button")
    button.setAttribute("type", "button")
    button.innerText = "Remove"
    
    fieldSet.appendChild(button)

    button.addEventListener("click", () => {
        workoutFields.removeChild(fieldSet)

        for (let i = 0; i < workoutFields.childElementCount; i++) {
            const child = workoutFields.children[i]
            const legend = child.querySelector("legend")
            legend.innerText = `Weight ${ i + 1 }`

            child.querySelectorAll("label").forEach(element => {
                const input = element.querySelector("input")
                if (input && element.innerText == "Name") {
                    input.setAttribute("name", `weights[${ i }][exerciseName]`)
                } else if (input && element.innerText == "Weight") {
                    input.setAttribute("name", `weights[${ i }][weight]`)
                }
            })
        }
    })
}

addWorkoutButton.addEventListener("click", () => {
    if (currentExercises) {
        const childElements = workoutFields.childElementCount + 1
        const selectList = buildSelectFromExercises(currentExercises, `weights[${childElements}][exerciseName]`)
        
        addExerciseField(selectList)
    }
})

workoutSelect.addEventListener("change", onMainSelectChanged)