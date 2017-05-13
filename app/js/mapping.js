function Graph() {
  this.nodes = {};
  this.edges = {};
};

Graph.prototype.addNode = function(node) {
  this.nodes[node] = node;
};

Graph.prototype.contains = function(node) {
  return this.nodes[node] ? true : false;
};

Graph.prototype.removeNode = function(node) {
  if (this.contains(node)) {
    delete this.nodes[node];
  }
};

Graph.prototype.hasEdge = function(fromNode, toNode) {
  for (var key in this.edges) {
    var searchOne = this.edges[key][0] === fromNode && this.edges[key][1] === toNode;
    var searchTwo = this.edges[key][1] === fromNode && this.edges[key][0] === toNode;
    if (searchOne || searchTwo) return true;
  }
  return false;
};

Graph.prototype.addEdge = function(fromNode, toNode) {
  this.edges[fromNode] = [fromNode, toNode];
};

Graph.prototype.removeEdge = function(fromNode, toNode) {
  if (this.hasEdge(fromNode, toNode)) {
    delete this.edges[fromNode];
  }
};

var graph = new Graph();
graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
graph.addNode(6);
graph.addNode(7);
graph.addNode(8);
//graph.print(); // 1 -> | 2 -> | 3 -> | 4 -> | 5 -> | 6 ->
graph.addEdge(1, 2);
graph.addEdge(1, 5);
graph.addEdge(2, 3);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(4, 6);
//graph.print(); // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4
console.log(graph);