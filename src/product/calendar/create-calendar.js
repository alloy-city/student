import Calendar from './calendar'

import addSidebar from './add-side-bar'
import addDateTime from './add-date-time'
import addLabels from './add-labels'
import addDays from './add-days'

function createCalendar(calendar, element, adjuster) {
    if (typeof adjuster !== 'undefined') {
        var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
        calendar = new Calendar(calendar.Model, calendar.Options, newDate);
        element.innerHTML = '';
    } else {
        for (var key in calendar.Options) {
            typeof calendar.Options[key] != 'function' && typeof calendar.Options[key] != 'object' && calendar.Options[key] ? element.className += " " + key + "-" + calendar.Options[key] : 0;
        }
    }

    let mainSection = document.createElement('div');
    mainSection.className += "cld-main";

    if (calendar.Options.Color) {
        mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
    }

    if (calendar.Options.LinkColor) {
        mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
    }

    element.appendChild(mainSection);

    if (calendar.Options.NavShow && calendar.Options.NavVertical) {
        addSidebar(calendar, element)
    }

    if (calendar.Options.DateTimeShow) {
        addDateTime(calendar, element, mainSection);
    }

    addLabels(mainSection);
    addDays(calendar, mainSection);
}

function createInitialCalendar (el, data, settings) {
    let obj = new Calendar(data, settings);
    createCalendar(obj, el);
}

export { createCalendar, createInitialCalendar }