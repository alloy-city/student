export default mainSection => {
    var labels = document.createElement('ul');
    labels.className = 'cld-labels';

    for (var i = 0; i < string.calendar.weekDays.length; i++) {
        var label = document.createElement('li');
        label.className += "cld-label";
        label.innerHTML = string.calendar.weekDays[i];
        labels.appendChild(label);
    }
    mainSection.appendChild(labels);
}