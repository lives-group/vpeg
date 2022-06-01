var stepCounter = 0; // step counter

function nextFrame() {

    fetch("../debug.json").then(response => response.json()).then(data => {

        if (stepCounter <= data.debugFrames.length) {
            const previousView = document.querySelector("#previousView");
            const currentView = document.querySelector("#currentView");
            const frameView = document.querySelector("#frameView"); // the debugView element on html
            const frame = data.debugFrames[stepCounter]; // the step frame from json

            previousView.innerHTML = currentView.innerHTML;
            currentView.innerHTML = frameView.innerHTML;

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

            // input
            const currentFrame = data.debugFrames[stepCounter - 1];
            const inputView = document.querySelector("#inputView");
            const inputIndex = currentFrame.input;
            const userInput = data.userInput;

            inputView.innerHTML = ``;

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

            // status
            const statusView = document.querySelector("#statusView");
            const status = currentFrame.status;
            statusView.innerHTML = `${status}`;

        }

        /* ANTIGO
        if (stepCounter <= data.debugFrames.length) {
            const debugView = document.querySelector("#debugView"); // the debugView element on html
            const frame = data.debugFrames[stepCounter]; // the step frame from json

            console.log(frame);

            if (frame.previousPEG == null) {  // if the frame represents the rule's first call

                if (frame.tag === "i") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret dv-item"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }

                else if (frame.tag === "s") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret dv-item" style="color:green;"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }

                else {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret dv-item" style="color:red;"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }
            }

            else {  // if the frame doesn't represent the rule's first call

                if (frame.tag === "i") {
                    debugView.innerHTML = `
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
                    debugView.innerHTML = `
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
                    debugView.innerHTML = `
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
            
            // input
            const userInput = data.userInput;
            const inputLine = document.querySelector("#inputLine").cells;
            const inputIndex = frame.input;

            for(let i = 0; i <= userInput.length; i ++) {
                const pointerPos = document.querySelector(`#pointer${i}`);
                console.log(pointerPos);

                if(i === inputIndex) {
                    pointerPos.innerHTML = `^`;
                    inputLine[i].setAttribute("style", "border-color:orangered;");
                } else if(i === userInput.length && i === inputIndex) {
                    pointerPos.innerHTML = `^`;
                    inputLine[i].setAttribute("style", "border-color:orangered;");
                } else {
                    pointerPos.innerHTML = ``;
                    inputLine[i].setAttribute("style", "border-color:rgb(233,233,233);");
                }
            }

            // depth
            const depthHeap = document.querySelector("#depthHeap");
            depthHeap.innerHTML = `<tr><td></td></tr>`; // clear depth table
            const depth = frame.callStack;

            if(depth.length) {
                for(let i = depth.length - 1; i >= 0; i--) {
                    depthHeap.innerHTML += `
                    <tr><td>${depth[i]}</td></tr>
                    `;
                }
            } 

            // status
            const status = document.querySelector("#status");
            status.innerHTML += `${frame.status}\n`;
            status.scrollTop = status.scrollHeight;

        }

        */
    });
    stepCounter = stepCounter + 1;
}

function previousFrame() {
    stepCounter = stepCounter - 1;

    fetch("../debug.json").then(response => response.json()).then(data => {

        if (stepCounter <= data.debugFrames.length) {
            const previousView = document.querySelector("#previousView");
            const currentView = document.querySelector("#currentView");
            const frameView = document.querySelector("#frameView"); // the debugView element on html
            const frame = data.debugFrames[stepCounter]; // the step frame from json

            frameView.innerHTML = currentView.innerHTML;
            currentView.innerHTML = previousView.innerHTML;

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

            // input
            const currentFrame = data.debugFrames[stepCounter - 1];
            const inputView = document.querySelector("#inputView");
            const inputIndex = currentFrame.input;
            const userInput = data.userInput;

            inputView.innerHTML = ``;

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

            // status
            const statusView = document.querySelector("#statusView");
            const status = currentFrame.status;
            statusView.innerHTML = `${status}`;
        }

        /* ANTIGO
        if (stepCounter <= data.debugFrames.length) {
            const debugView = document.querySelector("#debugView"); // the debugView element on html
            const frame = data.debugFrames[stepCounter]; // the step frame from json

            console.log(frame);

            if (frame.previousPEG == null) {  // if the frame represents the rule's first call

                if (frame.tag === "i") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }

                else if (frame.tag === "s") {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret" style="color:green;"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }

                else {
                    debugView.innerHTML = `
                    <li>
                        <span class="caret" style="color:red;"><strong class="dv-item">${frame.actualPEG}</strong></span>
                    </li>
                    `;
                }
            }

            else {  // if the frame doesn't represent the rule's first call

                if (frame.tag === "i") {
                    debugView.innerHTML = `
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
                    debugView.innerHTML = `
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
                    debugView.innerHTML = `
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

            // input
            const userInput = data.userInput;
            const inputLine = document.querySelector("#inputLine").cells;
            const inputIndex = frame.input;

            for(let i = 0; i < userInput.length; i ++) {
                const pointerPos = document.querySelector(`#pointer${i}`);
                console.log(pointerPos);

                if(i === inputIndex) {
                    pointerPos.innerHTML = `^`;
                    inputLine[i].setAttribute("style", "border-color:orangered;");
                } else if(i === userInput.length && i === inputIndex) {
                    pointerPos.innerHTML = `^`;
                    inputLine[i].setAttribute("style", "border-color:orangered;");
                } else {
                    pointerPos.innerHTML = ``;
                    inputLine[i].setAttribute("style", "border-color:rgb(233,233,233);");
                }
            }

            // depth
            const depthHeap = document.querySelector("#depthHeap");
            depthHeap.innerHTML = `<tr><td></td></tr>`; // clear depth table
            const depth = frame.callStack;

            if(depth.length) {
                for(let i = depth.length - 1; i >= 0; i--) {
                    depthHeap.innerHTML += `
                    <tr><td>${depth[i]}</td></tr>
                    `;
                }
            } 

            // status
            const status = document.querySelector("#status");
            status.innerHTML += `${frame.status}\n`;
            status.scrollTop = status.scrollHeight;
        }
        */
    });
}