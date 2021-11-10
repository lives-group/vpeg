// read json to html
fetch("../debug.json").then(response => response.json()).then(data => {

    // item1: code
    const code = data.code;
    const olCode = document.querySelector("#code");
    olCode.innerHTML += `<li><code><pre>${code}</pre></code></li>`;
    
    // item2: input
    const input = data.input;
    const inputSize = data.inputSize; // talvez nem precise dessa propriedade
    const inputLine = document.querySelector("#inputLine");
    const tagLine = document.querySelector("#tagLine");

    for(let i = 0; i < input.length; i ++) {
        if(i === 0) {
            inputLine.innerHTML += `<td class="inputData" style="color: yellow">${input[i]}</td>`;
        } else {
            inputLine.innerHTML += `<td class="inputData"">${input[i]}</td>`;
            tagLine.innerHTML += `<td class="inputData"></td>`
        }
    }

    // item3: tree view
    const firstTreeStep = data.tree[0];
    const treeView = document.querySelector("#treeView");

    treeView.innerHTML += `
    <li>
        <span class="caret"><strong>${firstTreeStep.rule}</strong> (<strong>${input}</strong>)</span>
        <ul class="nested" id="${firstTreeStep.id}"></ul>
    </li>
    `;

})