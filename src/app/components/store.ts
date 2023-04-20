import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const edgeType = 'smoothstep';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setEdges: (staet: Edge<any>[]) => void;
  hasStoredLayout: boolean;
};

const useStore = create(
  persist<RFState>(
    (set, get) => ({
      nodes: [
        {
          id: '1',
          type: 'customNode',
          position: { x: 0, y: 0 },
          data: { label: 'Angela Smith', files: 13 },
        },
        {
          id: '2',
          type: 'customNode',
          position: { x: 0, y: 100 },
          data: { label: 'Michael Smith', files: 13 },
        },
        {
          id: '3',
          type: 'customNode',
          position: { x: 0, y: 100 },
          data: { label: 'Rebecca Smith', files: 13 },
        },
        {
          id: '4',
          type: 'customNode',
          position: { x: 0, y: 100 },
          data: { label: 'John Smith', files: 13 },
        },
        {
          id: '5',
          type: 'customNode',
          position: { x: 0, y: 100 },
          data: { label: 'Melanie Smith', files: 13 },
        },
        {
          id: '6',
          type: 'customNode',
          position: { x: 0, y: 100 },
          data: { label: 'Daniel Matthews', files: 13 },
        },
        {
          id: '7',
          type: 'customNode',
          position: { x: 0, y: 100 },
          data: { label: 'Maggie Smith', files: 13 },
        },
        {
          id: '8',
          type: 'customNode',
          position: { x: 0, y: 100 },
          data: { label: 'Michelly Matthews', files: 13 },
        },
        {
          id: '9',
          type: 'customNode',
          position: { x: 0, y: 100 },
          data: { label: 'Danny Matthews', files: 13 },
        },
      ],
      edges: [
        {
          id: 'b1-t2',
          source: '1',
          sourceHandle: 'b',
          target: '2',
          targetHandle: 't',
          type: edgeType,
        },
        {
          id: 'b2-t4',
          source: '2',
          sourceHandle: 'b',
          target: '4',
          targetHandle: 't',
          type: edgeType,
        },
        {
          id: 'b3-t4',
          source: '3',
          sourceHandle: 'b',
          target: '4',
          targetHandle: 't',
          type: edgeType,
        },
        {
          id: 'b2-t5',
          source: '2',
          sourceHandle: 'b',
          target: '5',
          targetHandle: 't',
          type: edgeType,
        },
        {
          id: 'b2-t6',
          source: '2',
          sourceHandle: 'b',
          target: '6',
          targetHandle: 't',
          type: edgeType,
        },
        {
          id: 'b4-t7',
          source: '4',
          sourceHandle: 'b',
          target: '7',
          targetHandle: 't',
          type: edgeType,
        },
        {
          id: 'b5-t8',
          source: '5',
          sourceHandle: 'b',
          target: '8',
          targetHandle: 't',
          type: edgeType,
        },
        {
          id: 'b6-t8',
          source: '5',
          sourceHandle: 'b',
          target: '8',
          targetHandle: 't',
          type: edgeType,
        },
        {
          id: 'b5-t9',
          source: '5',
          sourceHandle: 'b',
          target: '9',
          targetHandle: 't',
          type: edgeType,
        },
        {
          id: 'b6-t9',
          source: '6',
          sourceHandle: 'b',
          target: '9',
          targetHandle: 't',
          type: edgeType,
        },
      ],
      hasStoredLayout: false,
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },

      setEdges: (state: Edge<any>[]) => {
        set({
          edges: state,
        });
      },
    }),
    {
      name: 'tree',
    }
  )
);

export default useStore;
