import 'reactflow/dist/base.css';
import './Flow.modules.css';
import LayoutFlow from './Dagre';

export const Flow = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <LayoutFlow />
    </div>
  );
};
