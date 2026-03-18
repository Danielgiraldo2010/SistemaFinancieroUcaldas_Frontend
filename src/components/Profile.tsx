import React, { useState } from 'react';
import ChangePasswordModal from './ChangePasswordModal';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h2>Mi Perfil</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#003e70] hover:bg-[#00284d] text-white px-4 py-2 rounded-md text-sm"
      >
        Cambiar Contraseña
      </button>
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Profile;