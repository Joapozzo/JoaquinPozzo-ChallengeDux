
import { useUserModal } from "@/src/context/UserModalContext";
import { User } from "@/src/types/user.types";
import { Button } from "primereact/button";

interface ActionsBodyTemplateProps {
    rowData: User;
}

const ActionsBodyTemplate = ({ rowData }: ActionsBodyTemplateProps) => {
    const { openDeleteModal } = useUserModal();

    return (
        <div className="flex items-start justify-start gap-2" >
            <Button
                icon="pi pi-trash"
                rounded
                outlined
                severity="danger"
                onClick={() => openDeleteModal(rowData)}
                tooltip="Eliminar"
                tooltipOptions={{ position: 'top' }}
            />
        </div>
    )
}

export default ActionsBodyTemplate;

