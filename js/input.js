function previousStep() {
    var x = document.getElementById("iterativeTable").rows[1].cells;
    var y = document.getElementById("iterativeTable").rows[0].cells;

    var i = 0;
    while (x[i].innerHTML != "^") {
        i++;
    }
    x[i].innerHTML = "";
    x[i - 1].innerHTML = "^";

    var y = document.getElementById("iterativeTable").rows[0].cells;
    y[i].setAttribute("style", "color:black;");
    y[i - 1].setAttribute("style", "color:yellow;");
}

function nextStep() {
    var x = document.getElementById("iterativeTable").rows[1].cells;
    var i = 0;

    while (x[i].innerHTML != "^") {
        i++;
    }
    x[i].innerHTML = "";
    x[i + 1].innerHTML = "^";

    var y = document.getElementById("iterativeTable").rows[0].cells;
    y[i + 1].setAttribute("style", "color:yellow;");
    y[i].setAttribute("style", "color:green;");
}