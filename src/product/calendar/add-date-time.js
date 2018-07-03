export default (calendar, element, mainSection) => {
    let datetime = document.createElement('div');
    datetime.className += "cld-datetime";
    if (calendar.Options.NavShow && !calendar.Options.NavVertical) {
        var rwd = document.createElement('div');
        rwd.className += " cld-rwd cld-nav";
        rwd.addEventListener('click', function () { Student.Product.createCalendar(calendar, element, -1); });
        rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
        datetime.appendChild(rwd);
    }
    let today = document.createElement('div');
    today.className += ' today';
    today.innerHTML = string.calendar.months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
    datetime.appendChild(today);
    if (calendar.Options.NavShow && !calendar.Options.NavVertical) {
        let fwd = document.createElement('div');
        fwd.className += " cld-fwd cld-nav";
        fwd.addEventListener('click', function () { Student.Product.createCalendar(calendar, element, 1); });
        fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        datetime.appendChild(fwd);
    }
    if (calendar.Options.DatetimeLocation) {
        document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
        document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
    }
    else { mainSection.appendChild(datetime); }
}