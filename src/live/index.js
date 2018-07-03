import { SocketEClassConnect } from './connect'

let socket = io(`${socketDomain}`)
let resourcesReceived = []

function clearResourcesReceived(){
    resourcesReceived = []
}

SocketEClassConnect(socket)

export { socket, SocketEClassConnect, resourcesReceived, clearResourcesReceived }