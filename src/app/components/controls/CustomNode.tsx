import { Handle, Position } from 'reactflow';

export function CustomNode({ data }: { data: any }) {
  return (
    <>
      <div
        style={{
          borderTopWidth: 8,
          width: '100%',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#c2c2c2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: -25,
            borderRadius: 25,
            borderWidth: 2.5,
            borderColor: 'white',
          }}
        >
          WL
        </div>
        <div style={{ marginTop: 45, textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold' }}>{data.label}</div>
          <hr style={{ marginTop: 25 }} />
          <div style={{ marginTop: 10, fontSize: 12 }}>{data.files} Files</div>
        </div>
      </div>
      <Handle type='source' position={Position.Top} id='t' />
      <Handle type='source' position={Position.Bottom} id='b' />
      <Handle type='source' position={Position.Right} id='r' />
      <Handle type='source' position={Position.Left} id='l' />

      <Handle type='target' position={Position.Top} id='t' />
      <Handle type='target' position={Position.Bottom} id='b' />
      <Handle type='target' position={Position.Right} id='r' />
      <Handle type='target' position={Position.Left} id='l' />
    </>
  );
}
