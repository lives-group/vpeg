// read json to html
fetch("../debug.json").then(response => response.json()).then(data => {

    const frameView = document.querySelector("#frameView");
    const frame = data.debugFrames[0];

    frameView.innerHTML = `
    <li>
        <span class="caret"><strong class="dv-item">${frame.actualPEG}</strong></span>
    </li>
     `;
})