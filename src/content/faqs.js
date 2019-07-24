import { get } from '../http';

function addFAQsToDOM(faqs) {
    faqs.forEach((faq, i) => {
        let e = document.createElement("div");
        e.classList.add("panel", "panel-default");
        e.id = faq._id;

        if (i == 0) {
            e.innerHTML = `
                <div class="panel-heading" role="tab" id="question-container-${i}">
                    <h4 class="panel-title">
                        <a id="question-${i}" role="button" data-toggle="collapse" data-parent="#faq-accordion" href="#answer-container-${i}" aria-expanded="true" aria-controls="answer-container-${i}">${faq.question}</a>
                    </h4>
                </div>
                <div id="answer-container-${i}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="question-container-${i}">
                    <div id="answer-${i}" class="panel-body">
                        ${faq.answer}
                    </div>
                </div>
            `;
        } else {
            e.innerHTML = `
                <div class="panel-heading" role="tab" id="question-container-${i}">
                    <h4 class="panel-title">
                        <a id="question-${i}" role="button" data-toggle="collapse" data-parent="#faq-accordion" href="#answer-container-${i}" aria-expanded="false" aria-controls="answer-container-${i}">${faq.question}</a>
                    </h4>
                </div>
                <div id="answer-container-${i}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="question-container-${i}">
                    <div id="answer-${i}" class="panel-body">
                        ${faq.answer}
                    </div>
                </div>
            `;
        }

        document.getElementById("faq-accordion").appendChild(e);
        document.getElementById(`question-${i}`).onclick = event => viewFAQ(event, faq._id);
    });
}

function faq() {
    get(`faq/get-by-language/${Auth.userData.uiLanguage}`, addFAQsToDOM);
}

function viewFAQ(event, faq) {
    if (event.target.classList.contains("collapsed")) {
        get(`faq/view/${faq}`, () => {});
    }
}

export { faq }
