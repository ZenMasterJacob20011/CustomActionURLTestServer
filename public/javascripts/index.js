"use strict";
let itemCnt = 0;
// @ts-ignore
const webSocket = new WebSocket(`ws://localhost:${window.WSPORT}`);
webSocket.onmessage = (event) => {
    const theJson = JSON.parse(event.data);
    if (sessionStorage.getItem("submissionItems") === null) {
        sessionStorage.setItem("submissionItems", JSON.stringify([]));
    }
    const storedJson = JSON.parse(sessionStorage.getItem("submissionItems"));
    storedJson.push(theJson);
    sessionStorage.setItem("submissionItems", JSON.stringify(storedJson));
    addSubmissionItem(theJson);
};
document.getElementById("customSubmissionURL").innerText += " " + location.origin;
/**
 * Creates a submission item and appends it to the accordion. Also increases the itemCnt global variable by 1
 * @param theJson The JSON data to be inserted in the accordion
 */
function addSubmissionItem(theJson) {
    itemCnt += 1;
    const accordion = document.getElementById("accordionExample");
    if (accordion) {
        accordion.insertAdjacentHTML("beforeend", AccordionItem(JSON.stringify(theJson, undefined, 2)));
        return;
    }
    throw Error("Could not find accordionExample ID");
}
/**
 * Creates the html string for an accordion item
 * @param theJson The JSON data to be inserted in the accordion item
 */
function AccordionItem(theJson) {
    return `
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${itemCnt}">
                Submission Item #${itemCnt}
            </button>
        </h2>
        <div id="collapse${itemCnt}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <pre>${theJson}</pre>
            </div>
        </div>
    </div>
    `;
}
/**
 * If the session storage has submission items then create submission items
 */
if (sessionStorage.getItem("submissionItems")) {
    for (const submissionItem of JSON.parse(sessionStorage.getItem("submissionItems"))) {
        addSubmissionItem(submissionItem);
    }
}
//# sourceMappingURL=index.js.map