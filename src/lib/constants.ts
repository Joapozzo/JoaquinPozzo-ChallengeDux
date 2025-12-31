export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const SECTOR_ID = process.env.NEXT_PUBLIC_SECTOR_ID;

export const estadoOptions = [
    { label: "Seleccione el estado", value: "" },
    { label: "Activo", value: "ACTIVO" },
    { label: "Inactivo", value: "INACTIVO" },
];

export const sectorOptions = [
    { label: "Seleccione el sector", value: "" },
    { label: "Sector 9000", value: "9000" },
];

export const estadoOptionsHome = [
    { label: "Activo", value: "ACTIVO" },
    { label: "Inactivo", value: "INACTIVO" },
  ];
