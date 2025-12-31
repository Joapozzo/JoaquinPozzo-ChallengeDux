'use client';
import { Button } from 'primereact/button';
import ModalLayout from '../templates/ModalLayout';
import { useModalClose } from '@/src/context/UserModalContext';

interface ConfirmDialogProps {
    visible: boolean;
    onConfirm: () => void;
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
}

const ConfirmDialogContent = ({
    onConfirm,
    message,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    loading = false,
}: Omit<ConfirmDialogProps, 'visible' | 'onHide' | 'title'>) => {
    const handleClose = useModalClose();

    return (
        <div className="flex flex-col items-center gap-3 py-10">
            <i className="pi pi-exclamation-triangle text-yellow-500" style={{ fontSize: '2rem' }} />
            <span className="text-gray-700 text-center font-medium">{message}</span>
            <div className="flex justify-end gap-2 mt-2">
                <Button
                    label={cancelLabel}
                    icon="pi pi-times"
                    onClick={handleClose}
                    severity="secondary"
                    outlined
                    disabled={loading}
                />
                <Button
                    label={confirmLabel}
                    icon="pi pi-check"
                    onClick={onConfirm}
                    severity="danger"
                    loading={loading}
                />
            </div>
        </div>
    );
};

const ConfirmDialog = ({
    visible,
    onConfirm,
    title = 'Confirmar',
    message,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    loading = false,
}: ConfirmDialogProps) => {
    if (!visible) return null;

    return (
        <ModalLayout title={title}>
            <ConfirmDialogContent
                onConfirm={onConfirm}
                message={message}
                confirmLabel={confirmLabel}
                cancelLabel={cancelLabel}
                loading={loading}
            />
        </ModalLayout>
    );
};

export default ConfirmDialog;