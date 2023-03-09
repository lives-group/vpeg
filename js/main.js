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
    console.log(inputRow.children[0]);

    inputRow.children[i].style.color = "black";
}

function resetInputColor() {
    for (let i = 0; i < inputText.length; i++) {
        inputRow.children[i].style.color = "black";
        inputRow.children[i].style.fontWeight = "normal";

        // Resetando o underline
        inputRow.children[i].style.textDecoration = "none";
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
            inputRow.children[i].style.color = "black";
        }
    }

    // Underline the "from" position
    if (d.from != -1) {
        inputRow.children[d.from].style.textDecoration = "underline";
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



