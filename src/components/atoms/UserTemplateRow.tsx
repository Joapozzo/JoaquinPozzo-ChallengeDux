import { useUserModal } from "@/src/context/UserModalContext";
import { User } from "@/src/types/user.types";

const UserBodyTemplate = (rowData: User) => {
    const { openEditModal } = useUserModal();

    return (
        <button
            onClick={() => openEditModal(rowData)}
            className="text-blue-500 underline hover:text-blue-600 font-bold cursor-pointer bg-transparent border-none p-0"
        >
            {rowData.usuario}
        </button>
    );
};

export default UserBodyTemplate