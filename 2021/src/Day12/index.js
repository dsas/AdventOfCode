/**
 * Given input of a list of foo-bar relationships, calculate the number of
 * routes from the 'start' to 'end' nodes, only visiting lowercase nodes once
 *
 */
const partOne = (input) => {
    const connections = parseInputString(input)
    const graph = toGraph(connections);
    return countRoutes(graph);
}

/**
 * Transforms connections into a list of nodes to the nodes it's connected to
 * @param {array} connections A list of connections in the form [from, to]
 * @returns {object} string => string[]
 */
const toGraph = (connections) => {
    const graph = {};
    connections.forEach( ([from, to]) => {
        if (graph[from] == undefined) {
            graph[from] = [];
        }
        // Not allowed to return to start so don't make any connections back to it
        if (to !== 'start') {
            graph[from].push(to);
        }

        if (graph[to] == undefined) {
            graph[to] = [];
        }
        // Not allowed to return to start so don't make any connections back to it
        if (from !== 'start') {
            graph[to].push(from);
        }
    });
    return graph;
}

/**
 * Find the number of distinct routes through the graph
 *
 * @param {object} graph
 * @param {boolean} smallNodesOnce true if lower case nodes can only be visited once per path, false if lower case nodes can be visited once per path but you get one free pass
 * @returns
 */
const countRoutes = (graph, smallNodesOnce = true) => {
    let completeRoutes = 0;
    const inProgressRoutes = [['start']];

    while (inProgressRoutes.length != 0) {
        let currentRoute = inProgressRoutes.pop();
        let currentNode = currentRoute[currentRoute.length - 1];
        graph[currentNode].forEach( nextNode => {
            let nextRoute = Array.from(currentRoute);
            if (nextNode == 'end') {
                completeRoutes++;
            } else if (canAddNodeToRoute(nextRoute, nextNode, smallNodesOnce)) {
                nextRoute.push(nextNode)
                inProgressRoutes.push(nextRoute);
            }
        });
    }
    return completeRoutes;
}

/**
 * See if the given node is valid as the next step in the route
 *
 * Assumes start and end nodes are dealt with separately
 * @param {array} route
 * @param {string} node
 * @param {boolean} smallNodesOnce see countRoutes
 * @returns
 */
const canAddNodeToRoute = (route, node, smallNodesOnce) => {
    if (node === node.toUpperCase()) {
        return true;
    } else if (!route.includes(node)) {
        return true;
    } else if (!smallNodesOnce && !visitedASmallCaveTwice(route)) {
        return true;
    }
    return false;
}

/**
 * Whether the given route contains >1 visit to a lowercase node
 * @param {array} route
 * @returns
 */
const visitedASmallCaveTwice = (route) => {
    return route.some( (node, key, arr) => {
        return node !== 'start' && node === node.toLowerCase() && key !== arr.indexOf(node)
    });
}
/**
 * Given input of a list of foo-bar relationships, calculate the number of
 * routes from the 'start' to 'end' nodes, only visiting lowercase nodes once
 * however one lowercase node can be visited multiple times
 */
const partTwo = (input) => {
    const connections = parseInputString(input)
    const graph = toGraph(connections);

    return countRoutes(graph, false);
}
const parseInputString = (input) => input.split("\n").map( (s) => s.split('-'));

module.exports = {partOne, partTwo};
