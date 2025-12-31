import { useTransition } from 'react';
import { UserFormData } from '@/src/lib/validations/user.schema';
import { createUserAction } from '@/src/actions/user.actions';

interface UseCreateUserProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const useCreateUser = ({
  onSuccess,
  onError,
}: UseCreateUserProps = {}) => {
  const [isPending, startTransition] = useTransition();

  const createUser = (data: UserFormData) => {
    startTransition(async () => {
      try {
        const result = await createUserAction(data);

        if (!result.success) {
          throw new Error(result.error || 'Error al crear usuario');
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
    createUser,
  };
};
