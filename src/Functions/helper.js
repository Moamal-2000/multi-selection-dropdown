export function findNodeById(nodes, id) {
  for (const node of nodes) {
    if (node.id === id) return node;
    const foundNode = findNodeById(node.Nodes, id);
    if (foundNode) return foundNode;
  }
  return null;
}
