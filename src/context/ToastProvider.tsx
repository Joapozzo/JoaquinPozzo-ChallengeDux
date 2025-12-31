'use client';

import { createContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

type ToastSeverity = 'success' | 'error' | 'info' | 'warn';

interface ToastContextValue {
  show: (
    severity: ToastSeverity,
    detail: string,
    summary?: string
  ) => void;
}

export const ToastContext =
  createContext<ToastContextValue | null>(null);

export const ToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const toastRef = useRef<Toast>(null);

  const show = (
    severity: ToastSeverity,
    detail: string,
    summary?: string
  ) => {
    toastRef.current?.show({
      severity,
      summary:
        summary ??
        (severity === 'success'
          ? 'Éxito'
          : severity === 'error'
          ? 'Error'
          : 'Aviso'),
      detail,
      life: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ show }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
