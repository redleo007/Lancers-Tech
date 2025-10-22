import React from 'react'


const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ children, onClose }) => (
<div style={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.3)' }}>
<div style={{ background: '#fff', padding: 16, width: 640, borderRadius: 8 }}>
{children}
<div style={{ marginTop: 12, textAlign: 'right' }}>
<button onClick={onClose}>Close</button>
</div>
</div>
</div>
)


export default Modal