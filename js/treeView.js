function showTreeChild() {
    var nestedChildren = document.getElementsByClassName("nested");
    var k = 0;

    while(nestedChildren[k].style.visibility === 'visible' && k < nestedChildren.length) {
        k ++;
    }

    nestedChildren[k].style.visibility = 'visible';    

    var treeChildren = document.getElementsByClassName("caret");
    treeChildren[k].parentElement.querySelector(".nested").classList.toggle("active");
    treeChildren[k].classList.toggle("caret-down");
}