export default (element) => {
    let agreements = `
        <div class="panel panel-default">
            <div class="panel-heading" role="tab">
                <h4 class="panel-title">
                    <div class="checkbox">
                        <label>
                            <input id="agreements-accepted" type="checkbox"> ${string.agreements.iAccept} <a class="collapsed" role="button" data-toggle="collapse" href="#product-detail-agreements" aria-expanded="false"><span class="text-info">${string.agreements.title}</span></a><span class="text-muted"> - ${string.commons.version} ${string.agreements.version}</span>
                        </label>
                    </div>
                </h4>
            </div>
            <div id="product-detail-agreements" class="panel-collapse collapse" role="tabpanel">
                <div class="panel-body">`

    agreements += `<h4 class="text-primary">${string.agreements.question}</h4><hr>`

    for (let i = 0; i<string.agreements.sections.length; i++) {
        agreements += `<p class="text-muted">${string.agreements.section} ${i+1}</p>`

        if (i == 1){
            if (Auth.userData.name){
                agreements += `<h4>${string.agreements.sections[i].title[0]}, <b>${Auth.userData.name}</b>, ${string.agreements.sections[i].title[2]}</h4>`
            } else {
                agreements += `<h4>${string.agreements.sections[i].title[0]}, ${string.agreements.sections[i].title[1]}, ${string.agreements.sections[i].title[2]}</h4>`
            }
        } else {
            agreements += `<h4>${string.agreements.sections[i].title}</h4>`
        }

        agreements += '<ol>'
        for (let j=0; j<string.agreements.sections[i].clauses.length; j++){
            agreements += `<li>${string.agreements.sections[i].clauses[j]}</li>`
        }
        agreements += '</ol>'

        if (i != string.agreements.sections.length - 1){
            agreements += `<hr>`
        }
    }

    agreements += `</div></div></div>`
    element.appendChild(htmlToElement(agreements))
}