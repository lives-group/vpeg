var stepCounter = 0; // step counter

function nextFrame() {

    fetch("../debug.json").then(response => response.json()).then(data => {

        const previousView = document.querySelector("#previousView");
        const currentView = document.querySelector("#currentView");
        const frameView = document.querySelector("#frameView");
        previousView.innerHTML = currentView.innerHTML;
        currentView.innerHTML = frameView.innerHTML;

        stepCounter = stepCounter + 1;

        if (stepCounter <= data.debugFrames.length) {

            const frame = data.debugFrames[stepCounter]; // the step frame from json

            if (frame.previousPEG == null) {  // if the frame represents the rule's first call
                if (frame.tag === "i") {
                    frameView.innerHTML = `
                    <li>
                        <span class="caret dv-item"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }
                else if (frame.tag === "s") {
                    frameView.innerHTML = `
                    <li>
                        <span class="caret dv-item" style="color:green;"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }
                else {
                    frameView.innerHTML = `
                    <li>
                        <span class="caret dv-item" style="color:red;"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }
            }

            else {  // if the frame doesn't represent the rule's first call
                if (frame.tag === "i") {
                    frameView.innerHTML = `
                    <li>
                        <span class="caret-down dv-item">${frame.previousPEG}</span>
                        <ul class="active">
                            <li class="dv-item">
                                <strong class="dv-item">${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                }
                else if (frame.tag === "s") {
                    frameView.innerHTML = `
                    <li>
                        <span class="caret-down dv-item">${frame.previousPEG}</span>
                        <ul class="active">
                            <li class="dv-item" style="color:green;">
                                <strong class="dv-item">${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                }
                else {
                    frameView.innerHTML = `
                    <li>
                        <span class="caret-down dv-item">${frame.previousPEG}</span>
                        <ul class="active">
                            <li class="dv-item" style="color:red;">
                                <strong class="dv-item">${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                }
            }

            // input and status
            const inputView = document.querySelector("#inputView");
            const statusView = document.querySelector("#statusView");
            inputView.innerHTML = ``;
            statusView.innerHTML = ``;

            const currentFrame = data.debugFrames[stepCounter - 1];
            const userInput = data.userInput;
            const inputIndex = currentFrame.input;

            if (userInput.length <= 5) {
                for (let i = 0; i < userInput.length; i++) {
                    if (i === inputIndex) {
                        inputView.innerHTML += `<span style="color:orangered;">${userInput[i]}</span>`;
                    }
                    else {
                        inputView.innerHTML += `${userInput[i]}`;
                    }
                }
            }

            // precisa completar com as demais condições para quando for maior que 5 !!!!!!!!!

            const status = currentFrame.status;
            statusView.innerHTML = `${status}`;
        }
    });
}


// PREVIOUS
function previousFrame() {

    fetch("../debug.json").then(response => response.json()).then(data => {

        if (stepCounter - 1 >= 0) {
            stepCounter = stepCounter - 1;

            const previousView = document.querySelector("#previousView");
            const currentView = document.querySelector("#currentView");
            const frameView = document.querySelector("#frameView");

            const inputView = document.querySelector("#inputView");
            const statusView = document.querySelector("#statusView");
            inputView.innerHTML = ``;
            statusView.innerHTML = ``;

            if (stepCounter === 0) {
                frameView.innerHTML = currentView.innerHTML;
                currentView.innerHTML = ``;
            }
            else if (stepCounter === 1) {
                frameView.innerHTML = currentView.innerHTML;
                currentView.innerHTML = previousView.innerHTML;
                previousView.innerHTML = ``;
            }
            else {
                frameView.innerHTML = currentView.innerHTML;
                currentView.innerHTML = previousView.innerHTML;
            }

            if (stepCounter <= data.debugFrames.length && stepCounter >= 2) {

                const frame = data.debugFrames[stepCounter - 2]; // the step frame from json

                if (frame.previousPEG == null) {  // if the frame represents the rule's first call
                    if (frame.tag === "i") {
                        previousView.innerHTML = `
                    <li>
                        <span class="caret"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                    }
                    else if (frame.tag === "s") {
                        previousView.innerHTML = `
                    <li>
                        <span class="caret" style="color:green;"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                    }
                    else {
                        previousView.innerHTML = `
                    <li>
                        <span class="caret" style="color:red;"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                    }
                }

                else {  // if the frame doesn't represent the rule's first call
                    if (frame.tag === "i") {
                        previousView.innerHTML = `
                    <li>
                        <span class="caret-down dv-item">${frame.previousPEG}</span>
                        <ul class="active">
                            <li class="dv-item">
                                <strong class="dv-item">${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                    }
                    else if (frame.tag === "s") {
                        previousView.innerHTML = `
                    <li>
                        <span class="caret-down dv-item">${frame.previousPEG}</span>
                        <ul class="active">
                            <li class="dv-item" style="color:green;">
                                <strong class="dv-item">${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                    }
                    else {
                        previousView.innerHTML = `
                    <li>
                        <span class="caret-down dv-item">${frame.previousPEG}</span>
                        <ul class="active">
                            <li class="dv-item" style="color:red;">
                                <strong class="dv-item">${frame.actualPEG}</strong>
                            </li>
                        </ul>
                    </li>
                    `;
                    }
                }

            }

            // input and status
            if (stepCounter > 0) {
                const currentFrame = data.debugFrames[stepCounter - 1];
                const userInput = data.userInput;
                const inputIndex = currentFrame.input;

                if (userInput.length <= 5) {
                    for (let i = 0; i < userInput.length; i++) {
                        if (i === inputIndex) {
                            inputView.innerHTML += `<span style="color:orangered;">${userInput[i]}</span>`;
                        }
                        else {
                            inputView.innerHTML += `${userInput[i]}`;
                        }
                    }
                }

                // precisa completar com as demais condições para quando for maior que 5 !!!!!!!!!

                const status = currentFrame.status;
                statusView.innerHTML = `${status}`;
            }
        }
    });
}