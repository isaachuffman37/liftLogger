const workoutFields = document.getElementById("weight-fields")
const addWorkoutButton = document.getElementById("add-weight")

function addExerciseField() {
    const childElements = workoutFields.childElementCount + 1
    let fieldSet = document.createElement("fieldset")
    
    let html = ""
    html += `<legend>Weight  ${ childElements }</legend>`
    html += `<label>Name<input type="text" name="weights[${childElements}][exerciseName]" required></label>`
    html += `<label>Weight<input type="number" name="weights[${childElements}][weight]" required></label>`

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
            legend.innerText = `Weight ${ i + 1 }`

            child.querySelectorAll("label").forEach(element => {
                if (element.innerText == "Name") {
                    const input = element.querySelector("input")
                    input.setAttribute("name", `weights[${ i }][exerciseName]`)
                } else if (element.innerText == "Weight") {
                    const input = element.querySelector("input")
                    input.setAttribute("name", `weights[${ i }][weight]`)
                }
            })
        }
    })
}

addWorkoutButton.addEventListener("click", addExerciseField)