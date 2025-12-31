// Utilizo enum para preveer si escala en un futuro
export enum EstadoUsuario {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo'
}

export interface User { 
    id: string;
    estado: EstadoUsuario;
    sector: string;
    usuario: string;
}