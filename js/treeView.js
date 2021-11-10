var stepCounter = 0; // step counter

function nextTreeStep() {

    stepCounter = stepCounter + 1;

    fetch("../debug.json").then(response => response.json()).then(data => {

        const tree = data.tree;
        const treeFlow = data.treeFlow;
        var treeStep = treeFlow[stepCounter];

        if (treeStep[0] !== 'S' && treeStep[0] !== 'F') {
            const step = tree[parseInt(treeStep)];
            console.log("passo " + stepCounter);
            console.log(step);

            const parent = document.getElementById(parseInt(step.parent));
            console.log("pai");
            console.log(parent);

            // adjust the caret symbol
            var caret = document.querySelector(".caret");
            if (caret != null) {
                caret.classList.remove("caret");
                caret.classList.add("caret-down");
            }


            if (step.caret) {
                parent.innerHTML += `
            <li>
                <span class="caret"><strong>${step.rule}</strong> (<strong>${step.input}</strong>)</span>
                <ul class="nested" id="${step.id}"></ul>
            </li>
            `;
            } else {
                parent.innerHTML += `
            <li id="${step.id}">
                <strong>${step.rule}</strong> (<strong>${step.input}</strong>)
            </li>
            `;
            }
            console.log(parent.className);

            // activate the nested caret
            if (parent.classList.contains("nested")) {
                parent.classList.remove("nested");
                parent.classList.add("active");
            }

        } else if (treeStep[0] === 'S') {
            treeStep = treeStep.slice(1);
            const step = tree[parseInt(treeStep)];
            var stepElement;
            console.log("passo " + stepCounter);
            console.log(step);

            if (step.caret) {
                stepElement = document.getElementById(parseInt(step.id)).parentElement;
            } else {
                stepElement = document.getElementById(parseInt(step.id));
            }
            stepElement.setAttribute("style", "color:green;");

        } else {
            treeStep = treeStep.slice(1);
            const step = tree[parseInt(treeStep)];
            var stepElement;
            console.log("passo " + stepCounter);
            console.log(step);

            if (step.caret) {
                stepElement = document.getElementById(parseInt(step.id)).parentElement;
            } else {
                stepElement = document.getElementById(parseInt(step.id));
            }
            stepElement.setAttribute("style", "color:red;");
        }
    });
}