// ******* GRAMÁTICA
/* S -> Ab
A -> aAa / epsilon */

// aaab -> falha
// aab -> aceita

//const inputText = "aaab";

/*

Test 4 -
S <- !! (A !'b') 'a'* B !. ;
A <- 'a' A 'b' / e ;
B <- 'b' B 'c' / e ;
----------------
S
----------------
"abc"

*/

const inputText = "abc";

const inputRow = document.getElementById("input");

inputRow.innerHTML = "";

for (let i = 0; i < inputText.length; i++) {

    const cell = document.createElement("td");
    const cellText = document.createTextNode(inputText[i]);
    cell.appendChild(cellText);
    inputRow.appendChild(cell);

    //As células da tabela na verdade estão dentro de um div, então é preciso acessar o pai do pai

    inputRow.children[i].style.color = "black";
}

function resetInputColor() {
    for (let i = 0; i < inputText.length; i++) {
        if (inputRow.children[i]?.style.color) {
            inputRow.children[i].style.color = "black";
            inputRow.children[i].style.fontWeight = "normal";
            // Resetando o underline
            inputRow.children[i].style.textDecoration = "none";
          }
          


        // Resetando o svg
        document.getElementsByClassName("arrow")[0]?.remove();
    }
}



// ************** Generate the tree diagram	 *****************
var margin = { top: 80, right: 0, bottom: 0, left: 250 };
var width = 960 - margin.right - margin.left;
var height = 960 - margin.top - margin.bottom;

var i = 0;
var duration = 1000;
var root;

var tree = d3.layout.tree().size([height, width]);

var diagonal = d3.svg.diagonal().projection(function (d) {
    return [d.x, d.y];
});

d3.select(window).on("resize", resize);

function resize() {
    var width = parseInt(d3.select("body").style("width"));
    var height = parseInt(d3.select("body").style("height"));
    d3.select("svg").attr("width", width).attr("height", height);
}

var svg = d3
    .select(".tree")
    .append("svg")
    .attr("width", '150vw')
    .attr("height", 10000)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
// Read from json

d3.json("../test4.json", function (error, treeData)
//d3.json("../test1.json", function (error, treeData) 
{
    root = treeData[0];
    root.x0 = 0;
    root.y0 = 0;
    //document.getElementsByClassName("input")[0].innerHTML += JSON.parse(treeData).input;
    update(root);
});

// Make the tree responsive to the window size
d3.select(window).on("resize", resize);

function resize() {
    var width = parseInt(d3.select("body").style("width"));
    var height = parseInt(d3.select("body").style("height"));
    d3.select("svg").attr("width", width).attr("height", height);
}



d3.select(self.frameElement).style("1000px", "500px");

function update(source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse();
    var links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 180;
    });

    // Update the nodes…
    var node = svg.selectAll("g.node").data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position
    var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut)
        .on("click", click);

    nodeEnter
        .append("circle")
        .attr("r", 1e-6)
        .style("fill", function (d) {
            return d._children ? d.type : "#fff";
        })
        .style("stroke", function (d) {
            return d.type;
        });

    nodeEnter
        .append("text")
        .attr("font-size", "12px")
        .attr("y", -25)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.name;
        })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    nodeUpdate
        .select("circle")
        .attr("r", 10)
        .style("fill", function (d) {
            return d._children ? d.type * 0.5 : "#fff";
        });

    nodeUpdate.select("text").style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + source.x + "," + source.y + ")";
        })
        .remove();

    nodeExit.select("path");

    nodeExit.select("text").style("fill-opacity", 1e-6);

    // Update the link
    var link = svg.selectAll("path.link").data(links, function (d) {
        return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .style("stroke", function (d) {
            return d.target.type;
        })
        .attr("d", function (d) {
            var o = { x: source.y0, y: source.x0 };
            return diagonal({ source: o, target: o });
        });

    // Transition links to their new position.
    link.transition().duration(duration).attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function (d) {
            var o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.y;
        d.y0 = d.x;
    });
}

// Toggle children on click.
function click(d) {
    resetInputColor();
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

function mouseOver(d) {

    d3.select(this)
        .select("circle")
        .attr("r", 13)
        .style("fill", function (e) {
            return e.type;
        })
        .style("fill-opacity", 0.8);

    d3.select(this)
        .select("text")
        .attr("font-size", "15px")
        .attr("font-weight", "bold");


    for (let i = 0; i < inputText.length; i++) {
        if (i >= d.from && i < d.to && d.from != -1) {
            inputRow.children[i].style.color = "orange";
            inputRow.children[i].style.fontWeight = "bold";
        }
        else {
            if(inputRow.children[i]?.style.color)
                inputRow.children[i].style.color = "black";
        }
    }

    // In "from" position, insert the svg arrow above the letter
    if (d.from != -1) {
            var arrow = document.createElement("img");
            arrow.src = "../assets/arrow.svg";
            arrow.classList.add("arrow");
            arrow.style.width = "25px";
            arrow.style.height = "25px";
            arrow.style.position = "absolute";
            arrow.style.top = (inputRow.children[d.from].offsetTop + 20) + "px";
            arrow.style.left = (inputRow.children[d.from].offsetLeft - 8)  + "px";
            inputRow.appendChild(arrow);
        
    }

}

function mouseOut(d) {

    d3.select(this)
        .select("circle")
        .attr("r", 10)
        .style("fill", function (e) {
            return e._children ? e.type : "#fff";
        })
        .style("fill-opacity", 1);

    d3.select(this)
        .select("text")
        .attr("font-size", "12px")
        .attr("font-weight", "normal");

    resetInputColor();
}

window.onscroll = function () { fixed() };

var header = document.getElementById("fixed_input");
var sticky = header.offsetTop;

function fixed() {
    if (window.pageYOffset > sticky) {
        header.classList.remove("header-distance");
    } else {
        header.classList.add("header-distance");
    }
}

function skip() {
    const input = document.getElementById("num-levels");
    const numLevels = parseInt(input.value);

    if (numLevels > 0) {
        expandFromLastOpenLevel(numLevels);
        // update(root);
    }

    
}

function expandFromLastOpenLevel(levelsToExpand) {
    node = root;
    let lastOpenLevel = findLastOpenLevel(node, 0);
    expandLevelsFromLastOpen(node, lastOpenLevel + levelsToExpand, 0);
    update(node);
}

function findLastOpenLevel(node, currentLevel) {
    // Achar o último nível aberto (com children e não _children)
    let lastOpenLevel = currentLevel;

    if (node._children) {
        return lastOpenLevel;

    } else if (node.children) {
        node.children.forEach(function (child) {
            let lastOpenLevelChild = findLastOpenLevel(child, currentLevel + 1);
            if (lastOpenLevelChild > lastOpenLevel) {
                lastOpenLevel = lastOpenLevelChild;
            }
        });
    }

    return lastOpenLevel;
}


function expandLevelsFromLastOpen(node, targetLevel, currentLevel) {

    if (currentLevel >= targetLevel) return;

    if (node._children) {
        node.children = node._children;
        node._children = null;
    }

    if (node.children) {
        node.children.forEach(function (child) {
            expandLevelsFromLastOpen(child, targetLevel, currentLevel + 1);
        });
    }
}

function back() {
    const input = document.getElementById("num-levels");
    const numLevels = parseInt(input.value);

    if (numLevels > 0) {
        collapseFromLastOpenLevel(numLevels);
    }
}

function collapseFromLastOpenLevel(levelsToCollapse) {
    node = root;
    let lastOpenLevel = findLastOpenLevel(node, 0);
    collapseLevelsFromLastOpen(node, lastOpenLevel - levelsToCollapse, 0);
    update(node);
}

function collapseLevelsFromLastOpen(node, targetLevel, currentLevel) {
    if (currentLevel >= targetLevel) {
        if (node.children) {
            node._children = node.children;
            node.children = null;
        }
    } else if (node.children) {
        node.children.forEach(function (child) {
            collapseLevelsFromLastOpen(child, targetLevel, currentLevel + 1);
        });
    }
}


// Obtém o elemento .table-container
const tableContainer = document.querySelector('.table-container');

// Armazena os valores de scroll inicial
let initialScrollX = tableContainer.scrollLeft;
let initialScrollY = tableContainer.scrollTop;

// Adiciona um ouvinte de evento de rolagem ao .table-container
tableContainer.addEventListener('scroll', function() {
  // Calcula a diferença de scroll em relação ao valor inicial
  const deltaX = tableContainer.scrollLeft - initialScrollX;
  const deltaY = tableContainer.scrollTop - initialScrollY;

  // Ajusta a margem esquerda do .table-container de acordo com o scroll na direção x
  const currentMarginLeft = parseInt(getComputedStyle(tableContainer).marginLeft, 10) || 0;
  tableContainer.style.marginLeft = `${currentMarginLeft + deltaX}px`;

  // Ajusta o scroll vertical do body de acordo com o scroll na direção y
  window.scrollBy(0, deltaY);

  // Atualiza os valores de scroll inicial
  initialScrollX = tableContainer.scrollLeft;
  initialScrollY = tableContainer.scrollTop;
});
