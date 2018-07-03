/* // TODO put the tooltip text on the cards

    var xpRequirements = [1000, 4000, 8000, 13000, 22000, 32000, 45000];

    for (var i = 0; i < courses.length; i++) {

        var startDate = moment(courses[i].hangouts[0]).format('DD/MM/YYYY - dddd');
        var day;
        var twoFirstDays = [moment(courses[i].hangouts[0]).format('ddd'), moment(courses[i].hangouts[1]).format('ddd')];

        if (twoFirstDays[0] == twoFirstDays[1]) {
            day = moment(courses[i].hangouts[0]).format('dddd');
        } else {
            day = moment(courses[i].hangouts[0]).format('ddd') + '/' + moment(courses[i].hangouts[1]).format('ddd');
        }

        // console.log(startDate, day, twoFirstDays)

        var hour = moment(courses[i].hangouts[0]).format('HH:mm:ss');

        if (courses[i][25] == Auth.userData.level) {
            $('#course-content').append('<tr id="' + courses[i].id + '" class="success pointer" data-toggle="tooltip" data-placement="auto" title="' + string.tooltips.yourLevel + '" onclick="window.Enlist.selectGroupeToEnlist(this.id)"><td>' + courses[i].id + '</td><td>' + string.material.levels[courses[i].level] + '</td><td>' + string.material.themes[courses[i].themeId] + '</td><td>' + day + '</td><td>' + hour + '</td><td>' + startDate + '</td></tr>');
        } else if (courses[i].level < Auth.userData.level) {
            $('#course-content').append('<tr id="' + courses[i].id + '" class="info pointer" data-toggle="tooltip" data-placement="auto" title="' + string.tooltips.belowLevel + '" onclick="window.Enlist.selectGroupeToEnlist(this.id)"><td>' + courses[i].id + '</td><td>' + string.material.levels[courses[i].level] + '</td><td>' + string.material.themes[courses[i].themeId] + '</td><td>' + day + '</td><td>' + hour + '</td><td>' + startDate + '</td></tr>');
        } else {
            var missingPoints = xpRequirements[courses[i].level] - Auth.userData.xp;
            var t = '<tr id="' + courses[i].id + '" data-toggle="tooltip" data-placement="auto" title="' + string.tooltips.aboveLevel[0] + missingPoints + string.tooltips.aboveLevel[1] + '"><td>' + courses[i].id + '</td><td>' + string.material.levels[courses[i].level] + '</td><td>' + string.material.themes[courses[i].themeId];
            var tt = '</td><td>' + day + '</td><td>' + hour + '</td><td>' + startDate + '</td></tr>';
            $('#course-content').append(t + tt);
        }

    }
    $('[data-toggle="tooltip"]').tooltip();
*/