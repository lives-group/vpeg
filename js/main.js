// ************** Generate the tree diagram	 *****************
var margin = { top: 80, right: 120, bottom: 20, left: 120 },
    width = 960 - margin.right - margin.left,
    height = 960 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree().size([height, width]);

var diagonal = d3.svg.diagonal().projection(function (d) {
    return [d.x, d.y];
});

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read from json
d3.json("../tree.json", function (error, treeData) {
    root = treeData[0];
    root.x0 = 0;
    root.y0 = width / 2;
    update(root);
});


d3.select(self.frameElement).style("height", "500px");

function update(source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

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
        .on("click", click);

    nodeEnter
        .append("path")
        .style("fill", function (d) {
            return d._children ? "grey" : "#fff";
        })
        .style("stroke", function (d) {
            return d.type;
        })
        .attr("d", d3.svg.symbol()
            .size(800)
            .type(function (d) {
                return "square";
            })
        );

    nodeEnter
        .append("text")
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
        .select("path")
        .style("fill", function (d) {
            return d._children ? "grey" : "#fff";
        });

    nodeUpdate.select("text").style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
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
            return d.target.level;
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
