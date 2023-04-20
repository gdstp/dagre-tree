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
import { edges, nodes } from './data';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setEdges: (staet: Edge<any>[]) => void;
  hasStoredLayout: boolean;
  onReset: () => void;
};

const useStore = create(
  persist<RFState>(
    (set, get) => ({
      nodes,
      edges,

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

      onReset() {
        set({ nodes, edges, hasStoredLayout: false });
      },
    }),
    {
      name: 'tree',
    }
  )
);

export default useStore;
