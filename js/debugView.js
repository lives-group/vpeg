var stepCounter = 0; // step counter

function nextFrame() {

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
            
            // input
            const userInput = data.userInput;
            const inputLine = document.querySelector("#inputLine");
            const pointerLine = document.querySelector("#pointerLine");
            const inputIndex = frame.input;

            for(let i = 0; i < userInput.length; i ++) {
                const pointerPos = document.querySelector(`#pointer${i}`);
                console.log(pointerPos);

                if(i === inputIndex) {
                    pointerPos.innerHTML = `^`;
                } else {
                    pointerPos.innerHTML = ``;
                }
            }

            // depth
            const depthHeap = document.querySelector("#depthHeap");
            depthHeap.innerHTML = `<tr><td></td></tr>`; // clear depth table
            const depth = frame.depth;

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

            // input
            const userInput = data.userInput;
            const inputLine = document.querySelector("#inputLine");
            const pointerLine = document.querySelector("#pointerLine");
            const inputIndex = frame.input;

            for(let i = 0; i < userInput.length; i ++) {
                const pointerPos = document.querySelector(`#pointer${i}`);
                console.log(pointerPos);

                if(i === inputIndex) {
                    pointerPos.innerHTML = `^`;
                } else {
                    pointerPos.innerHTML = ``;
                }
            }

            // depth
            const depthHeap = document.querySelector("#depthHeap");
            depthHeap.innerHTML = `<tr><td></td></tr>`; // clear depth table
            const depth = frame.depth;

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
        }
    });
}