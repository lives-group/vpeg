var stepCounter = 0; // step counter

function nextFrame() {

    fetch("../debug.json").then(response => response.json()).then(data => {

        if (stepCounter <= data.debugFrames.length) {
            const debugView = document.querySelector("#debugView"); // the debugView element on html
            const status = document.querySelector("#status");
            const frame = data.debugFrames[stepCounter]; // the step frame from json

            console.log(frame);

            if (frame.previousPEG == null) {  // if the frame represents the rule's first call

                if (frame.tag === "i") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret"><strong>${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }

                else if (frame.tag === "s") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret" style="color:green;"><strong>${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }

                else {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret" style="color:red;"><strong>${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }
            }

            else {  // if the frame doesn't represent the rule's first call

                if (frame.tag === "i") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret-down">${frame.previousPEG}</span>
                        <ul class="active">
                            <li>
                                <strong>${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                }

                else if (frame.tag === "s") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret-down">${frame.previousPEG}</span>
                        <ul class="active">
                            <li style="color:green;">
                                <strong>${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                }

                else {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret-down">${frame.previousPEG}</span>
                        <ul class="active">
                            <li style="color:red;">
                                <strong>${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                }
            }

            status.innerHTML += `> ${frame.status}\n`;
        }
    });
    stepCounter = stepCounter + 1;
}

function previousFrame() {
    stepCounter = stepCounter - 1;

    fetch("../debug.json").then(response => response.json()).then(data => {

        if (stepCounter <= data.debugFrames.length) {
            const debugView = document.querySelector("#debugView"); // the debugView element on html
            const frame = data.debugFrames[stepCounter]; // the step frame from json

            console.log(frame);

            if (frame.previousPEG == null) {  // if the frame represents the rule's first call

                if (frame.tag === "i") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret"><strong>${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }

                else if (frame.tag === "s") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret" style="color:green;"><strong>${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }

                else {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret" style="color:red;"><strong>${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }
            }

            else {  // if the frame doesn't represent the rule's first call

                if (frame.tag === "i") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret-down">${frame.previousPEG}</span>
                        <ul class="active">
                            <li>
                                <strong>${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                }

                else if (frame.tag === "s") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret-down">${frame.previousPEG}</span>
                        <ul class="active">
                            <li style="color:green;">
                                <strong>${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                }

                else {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret-down">${frame.previousPEG}</span>
                        <ul class="active">
                            <li style="color:red;">
                                <strong>${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                }
            }
        }
    });
}