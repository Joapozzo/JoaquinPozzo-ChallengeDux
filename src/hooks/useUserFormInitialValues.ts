// Hook que obtiene valores iniciales para el Form del usuario (con campos o vacio)
'use client';

import { useMemo } from 'react';
import { User } from '@/src/types/user.types';
import { UserFormData } from '@/src/lib/validations/user.schema';

interface UseUserFormInitialValuesProps {
  user: User | null;
}

export const useUserFormInitialValues = ({ user }: UseUserFormInitialValuesProps): UserFormData | undefined => {
  return useMemo(() => {
    if (!user) return undefined;
    
    const estadoMap: Record<string, 'ACTIVO' | 'INACTIVO'> = {
      activo: 'ACTIVO',
      inactivo: 'INACTIVO',
    };

    const estado = estadoMap[user.estado.toLowerCase()] || 'ACTIVO';

    return {
      id: user.id.toString(),
      nombre: user.usuario,
      sector: user.sector.toString(),
      estado: estado,
    };
  }, [user]);
};
