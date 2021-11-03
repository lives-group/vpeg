var treeChild = document.getElementsByClassName("caret");
var i;

for (i = 0; i < treeChild.length; i++) {
    treeChild[i].addEventListener("click", function () {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
}