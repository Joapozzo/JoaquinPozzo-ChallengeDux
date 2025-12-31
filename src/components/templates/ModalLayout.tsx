import styles from '@/src/styles/animation.module.css'
import { useUserModal } from '@/src/context/UserModalContext';

interface ModalLayoutProps {
    title: string;
    children: React.ReactNode;
}

const ModalLayout = ({ title, children }: ModalLayoutProps) => {
    const { isClosing, handleClose } = useUserModal();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`absolute inset-0 bg-black ${styles.overlay} ${isClosing ? styles.overlayExiting : styles.overlayEntering}`}
                onClick={handleClose}
            />
            
            <div 
                className={`relative bg-white rounded-lg shadow-lg w-full max-w-xl mx-4 ${styles.modal} ${isClosing ? styles.modalExiting : styles.modalEntering}`}
            >
                <div className="flex justify-between items-center bg-blue-500 p-4 rounded-t-lg">
                    <h2 className="text-lg font-semibold text-white">
                        {title}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="pi pi-times text-white hover:text-gray-200 transition-all duration-200 hover:rotate-90"
                        aria-label="Cerrar"
                    />
                </div>
                {children}
            </div>
        </div>
    );
};

export default ModalLayout;

