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
    html += "<ul>"
    html += `<li>Weight: <span>${ goalData.goalWeight }</span></li>`
    html += `<li>Status: <span>${ goalData.status }</span></li>`
    html += `<li>Deadline: <span>${ timeFormatter.format(goalData.deadline) }</span></li>`
    html += "</ul></div>"

    return html
}

module.exports = utils