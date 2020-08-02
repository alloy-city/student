export function markUpClassRoomEclassList(arr) {
    let markUp = `
    <table class="table table-striped">
      <tr class="pointer">
        <th onclick="sortEClasses(0)">${string.level}</th>
        <th onclick="sortEClasses(1)">${string.commons.title}</th>
        <th onclick="sortEClasses(2)">${string.commons.subtitle}</th>
      </tr>`
    for (let i = 0; i < arr.length; i++) {

        let tags = '';
        if (arr[i].tags) {
            for (let ii = 0; ii < arr[i].tags.length; ii++) {
                tags = tags + '<span class="label label-default pull-right">' + arr[i].tags[ii] + '</span>';
            }
        }

        // console.log(arr[i].level);

        let levelId = -2;
        let levelName = ""

        if (arr[i].level != 999) {
            levelId = arr[i].level
            levelName = string.material.levels[levelId].name
        }
        markUp = markUp + `
      <tr class="info pointer" onclick="Content.selectEclassToStudy('${arr[i]._id}')">
        <td>${levelId + 1} ${levelName}</td>
        <td>${arr[i].title} ${tags}</td>
        <td>${arr[i].subtitle}</td>
      </tr>`
    }
    markUp = markUp + '</table>';
    $('#material-display-eclasses').append(markUp);
}