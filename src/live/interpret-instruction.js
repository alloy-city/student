import { displayResource } from './display-resource'
import { retractResource } from './retract-resource'
import { controlAudio, audios } from '../content/audio'
import { controlVideo } from '../content/video'
import { setTab } from '../active-tab'
import { pointer } from './pointer'
import clearBoard from './clearBoard'

let nOfResourcesOnBoard = 0;

function interpretInstruction(instruction) {
    /// #if DEBUG
    // console.log(instruction)
    /// #endif
    if (localStorage.activeTab != "classroom"){
        setTab("classroom")
    }

    let emptyBoardMessage = document.getElementById("classroom-empty-board");
    if (emptyBoardMessage) emptyBoardMessage.remove();

    if (instruction.type == "clear board") {
        nOfResourcesOnBoard = 0;
        clearBoard();
        Student.Live.clearResourcesReceived()
    } else if (instruction.type == "resource") {
        nOfResourcesOnBoard++;
        displayResource(instruction.resource)
    } else if (instruction.type == "retract-resource") {
        if (--nOfResourcesOnBoard == 0) clearBoard();
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