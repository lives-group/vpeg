var stepCounter = 0; // step counter
var currentRow = 0;
var rowCount = 0;

function nextFrame() {

    fetch("../debug.json").then(response => response.json()).then(data => {

        stepCounter = stepCounter + 1;

        if (stepCounter <= data.debugFrames.length) {

            const frame = data.debugFrames[stepCounter]; // the step frame from json
            //const rowNumber = frame.row;

            let previousView = document.querySelector("#previousView".concat(currentRow));
            let currentView = document.querySelector("#currentView".concat(currentRow));
            let frameView = document.querySelector("#frameView".concat(currentRow));
            let aux = frameView;

            if (currentRow != rowCount) {

                currentRow = rowCount;

                //criar outra linha de exibição
                const frameContainer = document.querySelector(".frame-container");
                frameContainer.innerHTML += `
                <div id="previous-frame${currentRow}" class="previous-frame">
                    <br /><br />
                    <div id="previousView${currentRow}" class="view"><ul></ul></div>
                    <br /><br />
                </div>
                <div id="current-frame${currentRow}" class="current-frame">
                    <br /><br />
                    <div>
                        Input
                        <div id="inputView${currentRow}" class="inputView"></div>
                    </div>
                    <div id="currentView${currentRow}" class="view"><ul></ul></div>
                    <br />
                    <div id="statusView${currentRow}" class="statusView"></div>
                </div>
                <div id="next-frame${currentRow}" class="next-frame">
                    <br /><br />
                    <div id="frameView${currentRow}" class="view"><ul></ul></div>
                    <br /><br />
                </div>
                `;

                previousView = document.querySelector("#previousView".concat(currentRow));
                currentView = document.querySelector("#currentView".concat(currentRow));
                frameView = document.querySelector("#frameView".concat(currentRow));

                updateViews(frame, previousView, currentView, frameView);
                currentView.innerHTML = aux.innerHTML;
            }
            else {
                updateViews(frame, previousView, currentView, frameView);
            }

            // input and status
            let inputView = document.querySelector("#inputView".concat(currentRow));
            let statusView = document.querySelector("#statusView".concat(currentRow));
            inputView.innerHTML = ``;
            statusView.innerHTML = ``;

            updateInputStatus(data, stepCounter, inputView, statusView);

            if (frame.previousPEG.indexOf("/") != -1 && frame.tag === "i") {
                rowCount = rowCount + 1;
            }

            // TODO: apagar linhas já encerradas
            /*
            for (let i = 0; i < currentRow; i++) {
                let rootView = document.querySelector("#frameView".concat(i));
                let rootInput = document.querySelector("#inputView".concat(i));
                //console.log(rootInput.innerHTML);
                if (rootView.innerHTML === currentView.innerHTML && rootInput.innerHTML === inputView.innerHTML) {
                    //console.log("entrou2 ", i);
                    for (let j = i + 1; j < currentRow; j++) {
                        document.querySelector("#previous-frame".concat(j)).remove();
                        document.querySelector("#current-frame".concat(j)).remove();
                        document.querySelector("#next-frame".concat(j)).remove();
                    }
                }
            }
            */
        }
    });
}

// TODO: colocar previous alinhado com next
// PREVIOUS
function previousFrame() {

    fetch("../debug.json").then(response => response.json()).then(data => {

        if (stepCounter - 1 >= 0) {
            stepCounter = stepCounter - 1;

            const previousView = document.querySelector("#previousView");
            const currentView = document.querySelector("#currentView");
            const frameView = document.querySelector("#frameView");

            if (stepCounter === 0) {
                frameView.innerHTML = currentView.innerHTML;
                currentView.innerHTML = ``;
            }
            else if (stepCounter === 1) {
                frameView.innerHTML = currentView.innerHTML;
                currentView.innerHTML = previousView.innerHTML;
                previousView.innerHTML = ``;
            }
            else if (stepCounter <= data.debugFrames.length && stepCounter >= 2) {
                const frame = data.debugFrames[stepCounter - 2]; // the step frame from json
                updateViews(frame, frameView, currentView, previousView);
            }

            // input and status
            const inputView = document.querySelector("#inputView");
            const statusView = document.querySelector("#statusView");
            inputView.innerHTML = ``;
            statusView.innerHTML = ``;

            if (stepCounter > 0) {
                updateInputStatus(data, stepCounter, inputView, statusView);
            }
        }
    });
}

function updateViews(frame, view1, view2, view3) {

    view1.innerHTML = view2.innerHTML;
    view2.innerHTML = view3.innerHTML;

    if (frame.previousPEG == null) {  // if the frame represents the rule's first call
        if (frame.tag === "i") {
            view3.innerHTML = `
            <li>
                <span class="caret dv-item"><strong class="dv-item">${frame.actualPEG}</strong></span>
            </li>
            `;
        }
        else if (frame.tag === "s") {
            view3.innerHTML = `
            <li>
                <span class="caret dv-item" style="color:green;"><strong class="dv-item">${frame.actualPEG}</strong></span>
            </li>
            `;
        }
        else {
            view3.innerHTML = `
            <li>
                <span class="caret dv-item" style="color:red;"><strong class="dv-item">${frame.actualPEG}</strong></span>
            </li>
            `;
        }
    }

    else {  // if the frame doesn't represent the rule's first call
        if (frame.tag === "i") {
            view3.innerHTML = `
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
            view3.innerHTML = `
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
            view3.innerHTML = `
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

function updateInputStatus(data, step, inputView, statusView) {

    const currentFrame = data.debugFrames[step - 1];
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

    // TODO: precisa completar com as demais condições para quando for maior que 5 !!!!!!!!!

    const status = currentFrame.status;
    statusView.innerHTML = `${status}`;
}