'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/user.types';

interface UserModalContextType {
  visible: boolean;
  isClosing: boolean;
  mode: 'crear' | 'editar' | 'eliminar';
  selectedUser: User | null;
  openCreateModal: () => void;
  openEditModal: (user: User) => void;
  openDeleteModal: (user: User) => void;
  closeModal: () => void;
  handleClose: () => void;
}

const UserModalContext = createContext<UserModalContextType | undefined>(undefined);

export const UserModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mode, setMode] = useState<'crear' | 'editar' | 'eliminar'>('crear');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openCreateModal = () => {
    setSelectedUser(null);
    setMode('crear');
    setIsClosing(false);
    setVisible(true);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setMode('editar');
    setIsClosing(false);
    setVisible(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setMode('eliminar');
    setIsClosing(false);
    setVisible(true);
  };

  const closeModal = () => {
    setIsClosing(true);

    // Delay para la animación de cierre
    setTimeout(() => {
      setVisible(false);
      setSelectedUser(null);
      setIsClosing(false);
    }, 250);
  };

  const handleClose = closeModal;

  return (
    <UserModalContext.Provider
      value={{
        visible,
        isClosing,
        mode,
        selectedUser,
        openDeleteModal,
        openCreateModal,
        openEditModal,
        closeModal,
        handleClose,
      }}
    >
      {children}
    </UserModalContext.Provider>
  );
};

export const useUserModal = () => {
  const context = useContext(UserModalContext);
  if (!context) {
    throw new Error('useUserModal debe usarse dentro de UserModalProvider');
  }
  return context;
};

// Hook para obtener handleClose con animación (alias para compatibilidad)
export const useModalClose = () => {
  const { handleClose } = useUserModal();
  return handleClose;
};