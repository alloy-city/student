import { get } from '../http'

function history() {
    get(`user/${Auth.userData._id}`, res => {
        if (res && res.xpEvents && res.xpEvents.length && res.xpEvents.length > 0) {
            let hl = document.createElement("hr")
            let title = document.createElement("h3")
            let tableContainer = document.createElement("div")
            tableContainer.classList.add("pre-scrollable")
            title.innerText = string.activeResources.history.title
            let table = document.createElement("table")
            table.classList.add("table", "table-hover", "table-responsive")
    
            let head = document.createElement("thead")
            let body = document.createElement("tbody")

            head.innerHTML = `
                <tr>
                    <th>${string.activeResources.history.labels.type}</th>
                    <th>${string.activeResources.history.labels.desc}</th>
                    <th>${string.activeResources.history.labels.XPs}</th>
                    <th>${string.activeResources.history.labels.time}</th>
                </tr>
            `

            for (let event of res.xpEvents) {
                if (event.resource && event.resource.type && event.value && event.timestamp) {
                    let line = document.createElement("tr")
        
                    let type = document.createElement("td")
                    let desc = document.createElement("td")
                    let xps = document.createElement("td")
                    let time = document.createElement("td")
        
                    type.innerText = string.activeResources[event.resource.type]
    
                    let str = event.resource.resource.question
                    if (str.length > 64) {
                        desc.title = str
                        str = str.substring(0, 64)
                        str += " [...]"
                    }
                    desc.innerHTML = str;
                    
                    xps.innerText = `${event.value}/${event.resource.worth}`
                    time.innerText = moment(event.timestamp).fromNow()
                    time.title = event.timestamp;
        
                    line.appendChild(type)
                    line.appendChild(desc)
                    line.appendChild(xps)
                    line.appendChild(time)
        
                    body.appendChild(line)
                }
            }

            table.appendChild(head)
            table.appendChild(body)
            tableContainer.appendChild(table)
            document.getElementById("material-display-history").appendChild(hl)
            document.getElementById("material-display-history").appendChild(title)
            document.getElementById("material-display-history").appendChild(tableContainer)
        }
    })
}

export { history }
