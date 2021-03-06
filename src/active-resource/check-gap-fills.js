import { saveXpEntry } from './save-xp-entry'

function checkGapFills(id) {
    let arr = $(`#${id} input`);

    let correctAnswers
    $.each(arr, (key, value) => {
        Student.ActiveResource.gapsAnswer[id][key].userAnswer = $(value).val();
        if (Student.ActiveResource.gapsAnswer[id][key].userAnswer === Student.ActiveResource.gapsAnswer[id][key].answer) {
            if ($(value).next().attr("class") != "input-correct glyphicon glyphicon-ok text-success") $(value).after('<span class="input-correct glyphicon glyphicon-ok text-success" aria-hidden="true" style="top: 5px;right: 27px;"></span>');
        }
    })

    let numberOfcorrectAnswers = 0;
    for (var i = 0; i < Student.ActiveResource.gapsAnswer[id].length; i++) {
        if (Student.ActiveResource.gapsAnswer[id][i].answer === Student.ActiveResource.gapsAnswer[id][i].userAnswer) {
            numberOfcorrectAnswers++;
        }
    }

    if (numberOfcorrectAnswers == Student.ActiveResource.gapsAnswer[id].length) {
        notify(string.activeResources.right, 'success', false);
        saveXpEntry(id);
    } else {
        notify(string.activeResources.oneOrMoreWrong, 'danger', false);
    }
}

export { checkGapFills }
