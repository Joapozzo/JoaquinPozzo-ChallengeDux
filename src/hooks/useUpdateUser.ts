import { useTransition } from 'react';
import { UserFormData } from '@/src/lib/validations/user.schema';
import { updateUserAction } from '@/src/actions/user.actions';

interface UseUpdateUserProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const useUpdateUser = ({
  onSuccess,
  onError,
}: UseUpdateUserProps = {}) => {
  const [isPending, startTransition] = useTransition();

  const updateUser = (userId: string, data: UserFormData) => {
    startTransition(async () => {
      try {
        const result = await updateUserAction(userId, data);

        if (!result.success) {
          throw new Error(result.error || 'Error al actualizar usuario');
        }

        onSuccess?.();
      } catch (error) {
        onError?.(
          error instanceof Error
            ? error.message
            : 'Error inesperado'
        );
      }
    });
  };

  return {
    isPending,
    updateUser,
  };
};
