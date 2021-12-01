// read json to html
fetch("../debug.json").then(response => response.json()).then(data => {

    // item1: code
    const code = data.code;
    const olCode = document.querySelector("#code");
    olCode.innerHTML += `<li><code><pre>${code}</pre></code></li>`;
    
    // item2: input
    const input = data.userInput;
    const inputLine = document.querySelector("#inputLine");
    const pointerLine = document.querySelector("#pointerLine");

    for(let i = 0; i < input.length; i ++) {
        if(i === 0) {
            inputLine.innerHTML += `<td class="inputData">${input[i]}</td>`;
            pointerLine.innerHTML += `<td class="inputData" id="pointer${i}">^</td>`;
        } else {
            inputLine.innerHTML += `<td class="inputData"">${input[i]}</td>`;
            pointerLine.innerHTML += `<td class="inputData" id="pointer${i}"></td>`;
        }
    }

    // item3a: tree view
    const debugView = document.querySelector("#debugView"); // the debugView element on html
    const status = document.querySelector("#status");
    const frame = data.debugFrames[0]; // the step frame from json
    debugView.innerHTML = `
    <li>
        <span class="caret"><strong>${frame.actualPEG}</strong></span>
    </li>
    `;
    status.innerHTML += `> ${frame.status}\n`;

    // item3b: depth heap
    const depthHeap = document.querySelector("#depthHeap");
    
    depthHeap.innerHTML = `
    <tr><td></td></tr>
    `;
})