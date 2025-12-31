import { useTransition } from 'react';
import { deleteUserAction } from '@/src/actions/user.actions'; import { useUserModal } from '../context/UserModalContext';

interface UseDeleteUserProps {
    onSuccess?: () => void;
    onError?: (message: string) => void;
}

export const useDeleteUser = ({
    onSuccess,
    onError,
}: UseDeleteUserProps = {}) => {
    const [isPending, startTransition] = useTransition();
    const { selectedUser, mode, closeModal } = useUserModal();

    const message = `¿Estás seguro de que deseas eliminar al usuario "${selectedUser?.usuario}"?`;

    const confirmDelete = () => {
        if (!selectedUser || mode !== 'eliminar') return;

        startTransition(async () => {
            try {
                const result = await deleteUserAction(selectedUser.id.toString());

                if (!result.success) {
                    throw new Error(result.error || 'Error al eliminar usuario');
                }

                onSuccess?.();
                closeModal();
            } catch (error) {
                onError?.(
                    error instanceof Error
                        ? error.message
                        : 'Error inesperado'
                );
            }
        });
    };

    const setIsVisible = mode === 'eliminar' && selectedUser !== null;

    return {
        isPending,
        confirmDelete,
        message,

        isVisible: setIsVisible,
    };
};