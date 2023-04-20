import { useMemo } from 'react';

import 'reactflow/dist/base.css';
import './Flow.modules.css';
import { CustomNode } from './controls/CustomNode';
import useStore from './store';
import { CustomEdge } from './controls/CustomEdge';
import LayoutFlow from './Dagre';

export const Flow = () => {
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ special: CustomEdge }), []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <LayoutFlow />
    </div>
  );
};
