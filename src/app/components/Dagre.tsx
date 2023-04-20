import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Connection,
  ConnectionLineType,
  Controls,
  Edge,
  MiniMap,
  Node,
} from 'reactflow';
import dagre from 'dagre';

import useStore from './store';
import { CustomNode } from './controls/CustomNode';
import { CustomEdge } from './controls/CustomEdge';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 252;
const nodeHeight = 142;

interface NodeTypes {
  position: {
    x: number;
    y: number;
  };
  id: string;
}

const getLayoutedElements = (nodes: Node<NodeTypes>[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: 'TB' });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const LayoutFlow = () => {
  const { edges, nodes, setEdges, onNodesChange, onEdgesChange } = useStore();
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ special: CustomEdge }), []);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges(
        addEdge({ ...params, type: ConnectionLineType.SmoothStep }, edges)
      ),
    []
  );

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );

    useStore.setState({
      nodes: layoutedNodes,
      edges: layoutedEdges,
      hasStoredLayout: true,
    });
  }, [nodes, edges]);

  useEffect(() => {
    !useStore.getState().hasStoredLayout && onLayout();
  }, []);

  return (
    <div className='layoutflow'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default LayoutFlow;
