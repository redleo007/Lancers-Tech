import React from 'react';
import { MdCheckCircle, MdError } from 'react-icons/md';
import { useNotification } from '../../context/NotificationContext';

const Notification: React.FC = () => {
  const { notification, hideNotification } = useNotification();

  if (!notification) {
    return null;
  }

  const { message, type } = notification;
  const isSuccess = type === 'success';

  const icon = isSuccess ? (
    <MdCheckCircle className="notification-icon success" />
  ) : (
    <MdError className="notification-icon error" />
  );

  return (
    <div className={`notification ${type}`} onClick={hideNotification}>
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default Notification;