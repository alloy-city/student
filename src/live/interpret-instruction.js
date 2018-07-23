import { displayResource } from './display-resource'
import { retractResource } from './retract-resource'
import { controlAudio, audios } from '../content/audio'
import { controlVideo } from '../content/video'
import { setTab } from '../active-tab'
import { pointer } from './pointer'

function interpretInstruction(instruction) {
    /// #if DEBUG
    // console.log(instruction)
    /// #endif
    if (localStorage.activeTab != "classroom"){
        setTab("classroom")
    }

    if (instruction.type == "clear board") {
        $('#classroom-display-eclass').html('')
        Student.Live.clearResourcesReceived()
    } else if (instruction.type == "resource") {
        displayResource(instruction.resource)
    } else if (instruction.type == "retract-resource") {
        retractResource(instruction.resource._id)
    } else if (instruction.type == "control-video") {
        controlVideo(instruction)
    } else if (instruction.type == "control-audio") {
        controlAudio(instruction)
    } else if (instruction.type == "update-xp") {
        updateXp()
    } else if (instruction.type == "pointer-enter") {
        pointer(instruction)
    } else if (instruction.type == "pointer-coordinates") {
        pointer(instruction)
    } else if (instruction.type == "pointer-exit") {
        pointer(instruction)
    }

    let ack = instruction
    ack.receivedBy = Auth.userData._id;

    Student.Live.socket.emit("ack", instruction);
}

export { interpretInstruction }