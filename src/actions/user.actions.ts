'use server';

import { revalidateTag } from "next/cache";
import { API_URL, SECTOR_ID } from "../lib/constants";
import { UserFormData, userSchema } from "../lib/validations/user.schema";
import { User } from "../types/user.types";
import {
    handleAction,
    handleServerAction,
    apiFetch,
    parseResponse,
    type ActionResponse
} from "../lib/action.handler";

interface GetUsersParams {
    search?: string;
    estado?: 'ACTIVO' | 'INACTIVO';
    page?: number;
    limit?: number;
}

interface GetUsersResponse {
    data: User[];
    total: number;
    page: number;
    limit: number;
}

// Helper para unir el sector con la url y verificar que exista
function buildUrlWithSector(path: string): string {
    const queryParams = new URLSearchParams();
    if (SECTOR_ID) {
        queryParams.append('sector', SECTOR_ID);
    }
    return `${API_URL}${path}${queryParams.toString() ? `?${queryParams}` : ''}`;
}

export async function getUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
    const { search = '', estado, page = 1, limit = 10 } = params;

    const queryParams = new URLSearchParams();

    if (SECTOR_ID) {
        queryParams.append('sector', SECTOR_ID);
    }

    queryParams.append('_page', page.toString());
    queryParams.append('_limit', limit.toString());

    if (search) {
        queryParams.append('usuario_like', search);
    }

    if (estado && typeof estado === 'string') {
        queryParams.append('estado', estado);
    }

    return handleServerAction(async () => {
        const response = await apiFetch(`${API_URL}/personal?${queryParams}`, {
            next: {
                tags: ['users']
            },
        });

        const data = await parseResponse<User[]>(response);
        const totalHeader = response.headers.get('x-total-count');

        const total = totalHeader ? parseInt(totalHeader) : 0;

        return {
            data,
            total,
            page,
            limit,
        };
    });
}

export async function createUserAction(userData: UserFormData): Promise<ActionResponse<User>> {
    return handleAction(async () => {
        const validatedData = userSchema.parse(userData);

        const payload = {
            id: validatedData.id,
            usuario: validatedData.nombre,
            sector: parseInt(validatedData.sector),
            estado: validatedData.estado || 'ACTIVO',
        };

        const response = await apiFetch(buildUrlWithSector('/personal'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const newUser = await parseResponse<User>(response);

        revalidateTag('users', 'max');

        return newUser;
    });
}

export async function updateUserAction(id: string, userData: UserFormData): Promise<ActionResponse<User>> {
    return handleAction(async () => {
        if (!id || id.trim() === '') {
            throw new Error('ID de usuario inválido');
        }

        const validatedData = userSchema.parse(userData);

        const payload = {
            id: validatedData.id,
            usuario: validatedData.nombre,
            sector: parseInt(validatedData.sector),
            estado: validatedData.estado,
        };

        const response = await apiFetch(buildUrlWithSector(`/personal/${id}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const updatedUser = await parseResponse<User>(response);
        revalidateTag('users', 'max');

        return updatedUser;
    });
}

export async function deleteUserAction(id: string): Promise<ActionResponse<{ id: string }>> {
    return handleAction(async () => {
        if (!id || id.trim() === '') {
            throw new Error('ID de usuario inválido');
        }

        const response = await apiFetch(buildUrlWithSector(`/personal/${id}`), {
            method: 'DELETE',
        });

        await parseResponse(response);
        revalidateTag('users', 'max');

        return { id };
    });
}
