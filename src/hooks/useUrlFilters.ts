import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useDebounce } from "./useDebounce";

interface UrlFilters {
    initialSearch?: string;
    initialEstado?: 'ACTIVO' | 'INACTIVO';
}

export const 
useUrlFilters = (initialFilters: UrlFilters) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const isInitialMount = useRef(true);

    const { initialSearch = '', initialEstado } = initialFilters;

    const [search, setSearch] = useState(initialSearch);
    const [estado, setEstado] = useState<string>(initialEstado || "");

    // se usa useDebounce para esperar a que el usuario deje de tipear para evitar solicitudes innecesarias
    const debouncedSearch = useDebounce(search, 500);
        
    useEffect(() => {
        // Saltamos el primer render usando REF
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        
        const currentSearch = params.get('search') || '';
        const currentEstado = params.get('estado') || '';
        
        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }
        
        if (estado && estado !== "") {
            params.set('estado', estado);
        } else {
            params.delete('estado');
        }
        
        params.set('page', '1');

        const newSearch = params.get('search') || '';
        const newEstado = params.get('estado') || '';
        
        // Navegamos con los nuevos parametros
        if (currentSearch !== newSearch || currentEstado !== newEstado) {
            startTransition(() => {
                router.push(`?${params.toString()}`);
            });
        }
    }, [debouncedSearch, estado, router, searchParams]);

    const handleClearFilters = () => {
        setSearch("");
        setEstado("");
        
        startTransition(() => {
            router.push('?page=1');
        });
    };

    return {
        search,
        estado,
        debouncedSearch,
        setSearch,
        setEstado,
        handleClearFilters,
        isPending,
    };
};