import React, { useState } from 'react';
import Modal from '../pages/Modal';
import { useNotification } from '../context/NotificationContext';
import { Project } from '../types/project';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

export default function CreateProjectModal({ isOpen, onClose, onProjectCreated }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const { showNotification } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !key) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }
    // In a real app, you'd make an API call here.
    // For now, we'll just simulate it.
    const newProject = {
      _id: String(Date.now()),
      name,
      key: key.toUpperCase(),
      lead: { _id: 'u1', name: 'Demo User' },
      createdAt: new Date().toISOString(),
    };
    onProjectCreated(newProject);
    showNotification('Project created successfully!', 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Project">
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-group">
          <label>Project Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., SprintZen Development" required />
        </div>
        <div className="form-group">
          <label>Project Key</label>
          <input type="text" value={key} onChange={(e) => setKey(e.target.value.toUpperCase())} placeholder="e.g., SZEN" maxLength={4} required />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </Modal>
  );
}