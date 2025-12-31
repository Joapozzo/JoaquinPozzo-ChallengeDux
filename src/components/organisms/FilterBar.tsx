'use client';

import { Button } from "primereact/button";
import SearchInput from "../atoms/SearchInput";
import SelectFilter from "../atoms/SelectFilter";
import { estadoOptionsHome } from "@/src/lib/constants";
import { useUrlFilters } from "@/src/hooks/useUrlFilters";
interface FilterBarProps {
  initialSearch?: string;
  initialEstado?: 'ACTIVO' | 'INACTIVO';
}

const FilterBar = ({ initialSearch = '', initialEstado }: FilterBarProps) => {
  
  const { search, setSearch, estado, setEstado, handleClearFilters, isPending } = useUrlFilters({ initialSearch, initialEstado });

  return (
    <div className="flex w-full items-center gap-2">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Buscar por nombre..."
        disabled={isPending}
      />

      <SelectFilter
        options={estadoOptionsHome}
        placeholder="Seleccione el estado"
        onChange={setEstado}
        value={estado}
        disabled={isPending}
      />

      <div className="flex gap-2">
        {(search || estado) && (
          <Button
            icon="pi pi-filter-slash"
            label="Limpiar"
            onClick={handleClearFilters}
            severity="secondary"
            outlined
            disabled={isPending}
            loading={isPending}
          />
        )}
      </div>
    </div>
  );
};

export default FilterBar;