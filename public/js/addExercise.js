const workoutFields = document.getElementById("workout-fields")
const addWorkoutButton = document.getElementById("add-workout")

function addExerciseField() {
    const childElements = workoutFields.childElementCount + 1
    let fieldSet = document.createElement("fieldset")
    
    let html = ""
    html += `<legend>Exercise  ${ childElements }</legend>`
    html += `<label>Name<input type="text" name="exercises[${childElements}][exerciseName]" required></label>`
    html += `<label>Reps<input type="number" name="exercises[${childElements}][reps]" required></label>`
    html += `<label>Sets<input type="number" name="exercises[${childElements}][sets]" required></label>`

    fieldSet.innerHTML += html
    workoutFields.appendChild(fieldSet)

    const button = document.createElement("button")
    button.setAttribute("type", "button")
    button.innerText = "Remove"
    
    fieldSet.appendChild(button)

    button.addEventListener("click", () => {
        workoutFields.removeChild(fieldSet)

        for (let i = 0; i < workoutFields.childElementCount; i++) {
            const child = workoutFields.children[i]
            const legend = child.querySelector("legend")
            legend.innerText = `Exercise ${ i + 1 }`

            child.querySelectorAll("label").forEach(element => {
                if (element.innerText == "Name") {
                    const input = element.querySelector("input")
                    input.setAttribute("name", `exercises[${ i }][exerciseName]`)
                } else if (element.innerText == "Reps") {
                    const input = element.querySelector("input")
                    input.setAttribute("name", `exercises[${ i }][reps]`)
                } else if (element.innerText == "Sets") {
                    const input = element.querySelector("input")
                    input.setAttribute("name", `exercises[${ i }][sets]`)
                }
            })
        }
    })
}

addWorkoutButton.addEventListener("click", addExerciseField)