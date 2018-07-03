export default (calendar, mainSection) => {
    // Create Number Element
    function dayNumber(n) {
        var number = document.createElement('p');
        number.className += "cld-number";
        number.innerHTML += n;
        return number;
    }
    var days = document.createElement('ul');
    days.className += "cld-days";
    // Previous Month's Days
    for (var i = 0; i < (calendar.Selected.FirstDay); i++) {
        var day = document.createElement('li');
        day.className += "cld-day prevMonth";
        //Disabled Days
        var d = i % 7;
        for (var q = 0; q < calendar.Options.DisabledDays.length; q++) {
            if (d == calendar.Options.DisabledDays[q]) {
                day.className += " disableDay";
            }
        }

        var number = dayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i + 1));
        day.appendChild(number);

        days.appendChild(day);
    }
    // Current Month's Days
    for (var i = 0; i < calendar.Selected.Days; i++) {
        var day = document.createElement('li');
        day.className += "cld-day currMonth";
        //Disabled Days
        var d = (i + calendar.Selected.FirstDay) % 7;
        for (var q = 0; q < calendar.Options.DisabledDays.length; q++) {
            if (d == calendar.Options.DisabledDays[q]) {
                day.className += " disableDay";
            }
        }
        var number = dayNumber(i + 1);
        // Check Date against Event Dates
        for (var n = 0; n < calendar.Model.length; n++) {
            var evDate = calendar.Model[n].Date;
            var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i + 1));
            if (evDate.getTime() == toDate.getTime()) {
                number.className += " eventday";
                var title = document.createElement('span');
                title.className += "cld-title";
                if (typeof calendar.Model[n].Link == 'function' || calendar.Options.EventClick) {
                    var a = document.createElement('a');
                    a.setAttribute('href', '#');
                    a.innerHTML += calendar.Model[n].Title;
                    if (calendar.Options.EventClick) {
                        var z = calendar.Model[n].Link;
                        if (typeof calendar.Model[n].Link != 'string') {
                            a.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)));
                            if (calendar.Options.EventTargetWholeDay) {
                                day.className += " clickable";
                                day.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)));
                            }
                        } else {
                            a.addEventListener('click', calendar.Options.EventClick.bind(null, z));
                            if (calendar.Options.EventTargetWholeDay) {
                                day.className += " clickable";
                                day.addEventListener('click', calendar.Options.EventClick.bind(null, z));
                            }
                        }
                    } else {
                        a.addEventListener('click', calendar.Model[n].Link);
                        if (calendar.Options.EventTargetWholeDay) {
                            day.className += " clickable";
                            day.addEventListener('click', calendar.Model[n].Link);
                        }
                    }
                    title.appendChild(a);
                } else {
                    title.innerHTML += '<a href="' + calendar.Model[n].Link + '">' + calendar.Model[n].Title + '</a>';
                }
                number.appendChild(title);
            }
        }
        day.appendChild(number);
        // If Today..
        if ((i + 1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year) {
            day.className += " today";
        }
        days.appendChild(day);
    }
    // Next Month's Days
    // Always same amount of days in calander
    var extraDays = 13;
    if (days.children.length > 35) { extraDays = 6; }
    else if (days.children.length < 29) { extraDays = 20; }

    for (var i = 0; i < (extraDays - calendar.Selected.LastDay); i++) {
        var day = document.createElement('li');
        day.className += "cld-day nextMonth";
        //Disabled Days
        var d = (i + calendar.Selected.LastDay + 1) % 7;
        for (var q = 0; q < calendar.Options.DisabledDays.length; q++) {
            if (d == calendar.Options.DisabledDays[q]) {
                day.className += " disableDay";
            }
        }

        var number = dayNumber(i + 1);
        day.appendChild(number);

        days.appendChild(day);
    }
    mainSection.appendChild(days);
}