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
import { faker } from '@faker-js/faker';

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
  const {
    edges,
    nodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    hasStoredLayout,
    onReset,
  } = useStore();
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

  const onNewNode = useCallback(() => {
    useStore.setState({
      nodes: [
        ...nodes,
        {
          id: (nodes.length + 1).toString(),
          data: {
            label: faker.name.firstName(),
            files: faker.datatype.number(),
          },
          type: 'customNode',
          position: { x: 0, y: 0 },
        },
      ],
    });
  }, []);

  const onResetOrganize = () => {
    onReset();
    window.location.reload();
  };

  useEffect(() => {
    !hasStoredLayout && onLayout();
  }, []);

  return (
    <div className='layoutflow'>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onNewNode}>Add Node</button>
        <button onClick={onResetOrganize}>Reset</button>
      </div>
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
