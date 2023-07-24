import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const MinimalActionToast = ({
  action,
  message,
  duration = 3000,
  autoClose = true,
  onClose,
}) => {
  useEffect(() => {
    if (!autoClose) return;

    const timeoutID = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      // clear timeout when the component unmounts
      clearTimeout(timeoutID);
    };
  }, [autoClose, duration, onClose]);

  const actionType = (action) => {
    switch (action) {
      case 'success':
        return {
          color: '#198754',
          icon: 'bi-check-circle',
        };
      case 'warning':
        return {
          color: '#ffc107',
          icon: 'bi-exclamation-circle',
        };
      case 'error':
        return {
          color: '#dc3545',
          icon: 'bi-x-circle',
        };
      default:
        return {
          color: '#0d6efd',
          icon: 'bi-info-circle',
        };
    }
  };

  return createPortal(
    <div className="toast-container position-absolute p-3 top-0 end-0">
      <div
        className={`toast bg-white align-items-center show`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          borderLeft: `4px solid ${actionType(action).color}`,
        }}
      >
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center">
            <i
              className={`bi ${actionType(action).icon} me-2 fs-4`}
              style={{
                color: `${actionType(action).color}`,
              }}
            ></i>
            {message}
          </div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => onClose()}
          ></button>
        </div>
      </div>
    </div>,
    document.body
  );
};

MinimalActionToast.propTypes = {
  action: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  autoClose: PropTypes.bool,  
};

export default MinimalActionToast;
