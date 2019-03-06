import { get } from '../http'

function history() {
    get(`user/${Auth.userData._id}`, res => {
        let table = document.createElement("table")
        table.classList.add("table", "table-hover")

        let head = document.createElement("thead")
        let body = document.createElement("tbody")

        head.innerHTML = `
            <tr>
                <th>type</th>
                <th>description</th>
                <th>XPs</th>
                <th>time</th>
            </tr>
        `

        for (let event of res.xpEvents) {
            if (event.resource && event.resource.type && event.value && event.timestamp) {
                console.log(event)
                
                console.log(event)
                let line = document.createElement("tr")
    
                let type = document.createElement("td")
                let desc = document.createElement("td")
                let xps = document.createElement("td")
                let time = document.createElement("td")
    
                type.innerText = event.resource.type
                desc.innerHTML = event.resource.resource.question
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
        document.getElementById("material-display-history").appendChild(table)
    })
}

export { history }
