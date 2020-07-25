import { interpretInstruction } from './interpret-instruction'
import { compatibleBrowser } from '../compatible-browser'
import { show } from '../evidence'
import clearBoard from './clearBoard'
import { setTab } from '../active-tab'

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

        if (document.getElementById("tab-classroom") == null){
            document.getElementById("desktop").children[0].prepend(htmlToElement(`
                <li role="presentation">
                    <a id="tab-classroom" onclick="ActiveTab.save('classroom')" data-toggle="tab" href="#classroom">${string.tabs.classRoomTab}</a>
                </li>
            `))
        }

        let previousMessage = document.getElementById("teacher-present-message")
        if (previousMessage) previousMessage.parentElement.remove()
        notify(`${string.alerts.teacherPresent[0]} ${teacher.name} ${string.alerts.teacherPresent[1]}`, "info", false)
        if (localStorage.getItem("activeTab") !== "classroom") {
            show(`<p id="teacher-present-message">${string.alerts.teacherPresent[0]} ${teacher.name} ${string.alerts.teacherPresent[1]}. ${string.commons.goToThe_f} <a onclick="ActiveTab.setTab('classroom')" role="button">${string.tabs.classRoomTab}</a></p>`)
        }

        clearBoard();
    })

    socket.on("teacher-left", teacher => {
        if (localStorage.activeTab == "classroom"){
            setTab("material")
        }

        if (document.getElementById("tab-classroom") != null){
            document.getElementById("tab-classroom").remove();
        }

        let previousMessage = document.getElementById("teacher-present-message")
        if (previousMessage) previousMessage.parentElement.remove()
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