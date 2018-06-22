import { saveXpEntry } from './save-xp-entry'

function verifyActiveChoice(id, button) {
    let userAnswer = $(button).prev().children('.active').text()

    if (userAnswer == Student.ActiveResource.resourcesActiveCorrect[id]) {
        /// #if DEBUG
        console.log("Yes.")
        /// #endif
        
        if ($(`[name='${id}'] span`).length == 0) {
            console.log($('[name=' + id + '] span').length)
            $(button).after('<span class="glyphicon glyphicon-ok text-success" style="font-size: x-large;top: 9px;left: 7px;"></span>')
        }
        notify(string.activeResources.right, 'success', false)
        saveXpEntry(id)
    } else {
        /// #if DEBUG
        console.log("No.")
        /// #endif
        
        $(`[name='${id}'] span`).remove()
        notify(string.activeResources.wrong, 'danger', false)
    }
}

export { verifyActiveChoice }