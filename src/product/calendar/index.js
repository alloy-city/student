import { createInitialCalendar } from './create-calendar'

let settings = {
    Color: '#999',                //(string - color) font color of whole calendar.
    LinkColor: '#333',            //(string - color) font color of event titles.
    NavShow: true,                //(bool) show navigation arrows.
    NavVertical: false,           //(bool) show previous and coming months.
    NavLocation: '#foo',          //(string - element) where to display navigation, if not in default position.
    DateTimeShow: true,           //(bool) show current date.
    DateTimeFormat: 'mmm, yyyy',  //(string - dateformat) format previously mentioned date is shown in.
    DatetimeLocation: '',         //(string - element) where to display previously mentioned date, if not in default position.
    EventClick: '',               //(function) a function that should instantiate on the click of any event. parameters passed in via data link attribute.
    EventTargetWholeDay: false,   //(bool) clicking on the whole date will trigger event action, as opposed to just clicking on the title.
    DisabledDays: [],             //(array of numbers) days of the week to be slightly transparent. ie: [1,6] to fade Sunday and Saturday.
}

export default (h) => {
    let container = document.getElementById("hangouts-calendar")
    let listElement = document.getElementById("hangouts-list")
    let hangouts = [], event, year, month, day, hangout
    
    let list = `
        <div class="panel panel-default">
            <div class="panel-heading" role="tab">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" href="#product-detail-hangout-time" aria-expanded="false" aria-controls="product-detail-hangout-time">
                        ${string.productDetail.hangoutDetails}
                    </a>
                </h4>
            </div>
            <div id="product-detail-hangout-time" class="panel-collapse collapse" role="tabpanel">
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table">`

    for (let i = 0; i<h.length; i++){
        
        event = new Date(h[i])

        list += `
            <tr>
                <td>#${i+1}</td>
                <td>${moment(h[i]).format("LLLL")}</td>
            </tr>`

        if (event.getDate() != day){
            year = event.getFullYear()
            month = event.getMonth()
            day = event.getDate()
    
            hangout = {
                'Date': new Date(year, month, day),
                'Title': `${moment(h[i]).format('LT')}`
            }

            hangouts.push(hangout)
        }
    }

    list += `</table></div></div></div></div>`

    listElement.appendChild(htmlToElement(list))
    createInitialCalendar(container, hangouts, settings)
}