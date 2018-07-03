import { interpretInstruction } from './interpret-instruction'
import { compatibleBrowser } from '../compatible-browser'
import { show } from '../evidence'

function SocketEClassConnect(socket) {
    
    socket.on('welcome', (data) => {
        /// #if DEBUG
        // console.log(data);
        /// #endif
        
        let user = {
            _id: Auth.userData._id,
            email: Auth.userData.mainEmail,
            name: Auth.userData.name || "",
            accessLevel: Auth.userData.accessLevel,
            compatibleBrowser: compatibleBrowser()
        }

        socket.emit('handshake', user);
    })

    socket.on("teacher-present", teacher => {
        /// #if DEBUG
        // console.log(`Teacher ${teacher.name}/${teacher._id} present.`);
        /// #endif

        
        let previousMessage = document.getElementById("teacher-present-message")
        if (previousMessage) previousMessage.parentElement.remove()
        notify(`${string.alerts.teacherPresent[0]} ${teacher.name} ${string.alerts.teacherPresent[1]}`, "info", false)
        if (localStorage.getItem("activeTab") !== "classroom") {
            show(`<p id="teacher-present-message">${string.alerts.teacherPresent[0]} ${teacher.name} ${string.alerts.teacherPresent[1]}. ${string.commons.goToThe_f} <a onclick="ActiveTab.setTab('classroom')" role="button">${string.tabs.classRoomTab}</a></p>`)
        }
    })
    
    socket.on("instruction", interpretInstruction);
    
    socket.on("message", data => {
        /// #if DEBUG
        // console.log(data)
        /// #endif

        show(`${string.messages.suggestion[0]} <a onclick="Student.Product.view('${data.message}')" role="button">${string.messages.suggestion[1]}</a>.`, data.message)
    })
}

export { SocketEClassConnect }