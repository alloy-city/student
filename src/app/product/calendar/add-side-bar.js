export default (calendar, element) => {
    var sidebar = document.createElement('div');
    sidebar.className += 'cld-sidebar';

    var monthList = document.createElement('ul');
    monthList.className += 'cld-monthList';

    for (var i = 0; i < string.calendar.months.length - 3; i++) {
        var x = document.createElement('li');
        x.className += 'cld-month';
        var n = i - (4 - calendar.Selected.Month);
        // Account for overflowing month values
        if (n < 0) { n += 12; }
        else if (n > 11) { n -= 12; }
        // Add Appropriate Class
        if (i == 0) {
            x.className += ' cld-rwd cld-nav';
            x.addEventListener('click', function () {
                typeof calendar.Options.ModelChange == 'function' ? calendar.Model = calendar.Options.ModelChange() : calendar.Model = calendar.Options.ModelChange;
                createCalendar(calendar, element, -1);
            });
            x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
        }
        else if (i == string.calendar.months.length - 4) {
            x.className += ' cld-fwd cld-nav';
            x.addEventListener('click', function () {
                typeof calendar.Options.ModelChange == 'function' ? calendar.Model = calendar.Options.ModelChange() : calendar.Model = calendar.Options.ModelChange;
                createCalendar(calendar, element, 1);
            });
            x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
        }
        else {
            if (i < 4) { x.className += ' cld-pre'; }
            else if (i > 4) { x.className += ' cld-post'; }
            else { x.className += ' cld-curr'; }

            //prevent losing var adj value (for whatever reason that is happening)
            (function () {
                var adj = (i - 4);
                //x.addEventListener('click', function(){createCalendar(calendar, element, adj);console.log('kk', adj);} );
                x.addEventListener('click', function () {
                    typeof calendar.Options.ModelChange == 'function' ? calendar.Model = calendar.Options.ModelChange() : calendar.Model = calendar.Options.ModelChange;
                    createCalendar(calendar, element, adj);
                });
                x.setAttribute('style', 'opacity:' + (1 - Math.abs(adj) / 4));
                x.innerHTML += string.calendar.months[n].substr(0, 3);
            }()); // immediate invocation

            if (n == 0) {
                var y = document.createElement('li');
                y.className += 'cld-year';
                if (i < 5) {
                    y.innerHTML += calendar.Selected.Year;
                } else {
                    y.innerHTML += calendar.Selected.Year + 1;
                }
                monthList.appendChild(y);
            }
        }
        monthList.appendChild(x);
    }
    sidebar.appendChild(monthList);
    if (calendar.Options.NavLocation) {
        document.getElementById(calendar.Options.NavLocation).innerHTML = "";
        document.getElementById(calendar.Options.NavLocation).appendChild(sidebar);
    }
    else { element.appendChild(sidebar); }
}