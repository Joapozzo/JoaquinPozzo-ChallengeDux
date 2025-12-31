'use client';

import { useContext } from 'react';
import { ToastContext } from '../context/ToastProvider';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'useToast must be used within a ToastProvider'
    );
  }

  return {
    success: (detail: string, summary?: string) =>
      context.show('success', detail, summary),

    error: (detail: string, summary?: string) =>
      context.show('error', detail, summary),

    info: (detail: string, summary?: string) =>
      context.show('info', detail, summary),

    warn: (detail: string, summary?: string) =>
      context.show('warn', detail, summary),
  };
};
