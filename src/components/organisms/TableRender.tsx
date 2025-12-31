'use client';

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Column } from "primereact/column"
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { User } from "@/src/types/user.types";
import UserBodyTemplate from "../atoms/UserTemplateRow";
import ActionsBodyTemplate from "../molecules/ActionsBodyTemplate";

interface TableRenderProps {
    users: User[];
    total: number;
    currentPage: number;
    pageSize: number;
}

const TableRender = ({ users, total, currentPage, pageSize }: TableRenderProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (e: DataTablePageEvent) => {
        const newPage = e.page ? e.page + 1 : 1;
        const newRows = e.rows ?? 10;
    
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        params.set('limit', newRows.toString());
    
        router.push(`?${params.toString()}`);
    }

    return (
        <DataTable
            value={users}
            paginator
            rows={pageSize}
            rowsPerPageOptions={[5, 10, 20, 50]}
            totalRecords={total}
            first={(currentPage - 1) * pageSize}
            onPage={handlePageChange}
            lazy
        >
            <Column field="id" sortable header="ID" />
            <Column field="usuario" sortable header="Usuario" body={UserBodyTemplate} className="text-start"/>
            <Column field="estado" sortable header="Estado" />
            <Column field="sector" sortable header="Sector" />
            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionsBodyTemplate rowData={rowData}/>
                )}
            />
        </DataTable>
    )
}

export default TableRender