import { get } from '../http';

function createTableHeaders() {
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let courseName = document.createElement("th");
    let meetingTime = document.createElement("th");
    let presence = document.createElement("th");

    courseName.innerText = string.meetings.courseName;
    meetingTime.innerText = string.meetings.meetingTime;
    presence.innerText = string.meetings.presence;

    tr.appendChild(courseName);
    tr.appendChild(meetingTime);
    tr.appendChild(presence);

    thead.appendChild(tr);

    return thead;
}

function fetchMeetings() {
    get(`meeting/student/${Auth.userData._id}`, meetings => {
        if (meetings.length > 0) {
            let div = document.getElementById("courses-meetings");
            div.classList.add("table-responsive");
            let table = document.createElement("table");
            table.classList.add("table", "table-condensed", "table-condensed", "table-hover");
            let tbody = document.createElement("tbody");

            table.appendChild(createTableHeaders());
            table.appendChild(tbody);

            let now = new Date();
            let state = 0;
            let previousLine;

            meetings.forEach(m => {
                let line = document.createElement("tr");
                let course = document.createElement("td");
                let time = document.createElement("td");
                let presence = document.createElement("td");

                course.innerText = m.course.name;

                let t = moment(m.time);

                time.innerText = t.format("LL - LT");

                if (t > now) {
                    line.classList.add("info");
                } else {
                    if (state == 0) {
                        state = 1;
                        if (previousLine) {
                            previousLine.classList.remove("info");
                            previousLine.classList.add("success");
                            previousLine.setAttribute("title", string.meetings.nextMeeting);
                        }
                    }

                    if (m.present) presence.innerHTML = `<span class="glyphicon glyphicon-ok text-success" aria-hidden="true" title="${string.meetings.youWerePresent}"></span>`;
                    else presence.innerHTML = `<span class="glyphicon glyphicon-remove text-danger" aria-hidden="true" title="${string.meetings.youWereAbsent}"></span>`;
                }

                line.appendChild(course);
                line.appendChild(time);
                line.appendChild(presence);

                tbody.appendChild(line);
                previousLine = line;
            });

            div.appendChild(table);
        }
    });
}

export { fetchMeetings }
