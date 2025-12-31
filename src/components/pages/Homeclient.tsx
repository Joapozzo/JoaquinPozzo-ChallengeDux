'use client';

import PageHeader from '../../components/organisms/PageHeader';
import FilterBar from '../../components/organisms/FilterBar';
import ModalForm from '../../components/organisms/ModalForm';
import ConfirmDialog from '../../components/organisms/ModalConfirmation';
import { useUserModal } from '../../context/UserModalContext';
import { useToast } from '@/src/hooks/useToast';
import { useCreateUser } from '@/src/hooks/useCreateUser';
import { useUpdateUser } from '@/src/hooks/useUpdateUser';
import { useDeleteUser } from '@/src/hooks/useDeleteUser';
import { useUserFormInitialValues } from '@/src/hooks/useUserFormInitialValues';
import { UserFormData } from '../../lib/validations/user.schema';
import { PropsWithChildren } from 'react';

interface HomeClientProps {
  searchParams: {
    search?: string;
    estado?: 'ACTIVO' | 'INACTIVO';
    page?: string;
    limit?: string;
  };
}

const HomeClient = ({ searchParams, children }: PropsWithChildren<HomeClientProps>) => {
  const { success, error } = useToast();
  const { visible, mode, selectedUser, openCreateModal, closeModal } = useUserModal();

  const initialValues = useUserFormInitialValues({ user: selectedUser });

  const { createUser, isPending: isCreating } = useCreateUser({
    onSuccess: () => {
      success('Usuario creado correctamente');
      closeModal();
    },
    onError: error,
  });

  const { updateUser, isPending: isUpdating } = useUpdateUser({
    onSuccess: () => {
      success('Usuario actualizado correctamente');
      closeModal();
    },
    onError: error,
  });

  const {
    confirmDelete,
    isPending: isDeleting,
    message,
    isVisible: isDeleteVisible,
  } = useDeleteUser({
    onSuccess: () => {
      success('Usuario eliminado correctamente');
    },
    onError: error,
  });

  const handleSubmit = (data: UserFormData) => {
    if (mode === 'crear') createUser(data);
    if (mode === 'editar' && selectedUser) {
      updateUser(selectedUser.id, data);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader
        title="Usuarios"
        buttonLabel="Nuevo usuario"
        buttonIcon="pi pi-plus"
        buttonOnClick={openCreateModal}
      />

      <FilterBar
        initialSearch={searchParams.search}
        initialEstado={searchParams.estado}
      />

      {children}

      {mode !== 'eliminar' && (
        <ModalForm
          visible={visible}
          mode={mode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={isCreating || isUpdating}
        />
      )}

      <ConfirmDialog
        visible={isDeleteVisible}
        onConfirm={confirmDelete}
        title="Eliminar usuario"
        message={message}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        loading={isDeleting}
      />
    </div>
  );
};

export default HomeClient;