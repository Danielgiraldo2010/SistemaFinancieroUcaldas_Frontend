import React from 'react';
import { createPortal } from 'react-dom';
import ChangePassword from './ChangePassword';
import { X } from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <button
        type="button"
        className="bg-black bg-opacity-40"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          border: 'none',
          cursor: 'default',
        }}
        onClick={onClose}
        aria-label="Cerrar modal"
      />
      <dialog
        open
        className="relative bg-white rounded-2xl shadow-2xl p-6"
        style={{
          width: '100%',
          maxWidth: '400px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
          border: 'none',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <ChangePassword />
      </dialog>
    </>,
    document.body
  );
};

export default ChangePasswordModal;