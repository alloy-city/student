export default function clearBoard() {
    $('#classroom-display-eclass').html(`
            <div id="classroom-empty-board" style="height: 30em;position: relative;">
                <img src="/images/connection.png" style="width: 20em;opacity: 0.3;margin: 0;position: absolute;top: 50%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%);">
                <p style="margin: 5em 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    font-weight: bold;
                    font-size: large;
                    color: #808080;">${string.classroom.teacherArrived}</p>
                <p style="margin: 8em 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #808080;">${string.classroom.contentHere}</p>
            </div>
    `);
}
