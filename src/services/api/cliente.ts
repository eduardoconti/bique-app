import { api, ApiErrorResponse } from '@/services/api/api';

export type RegistrarClienteRequest = {
  nome: string;
  email: string;
  telefone: string;
};

export type RegistrarClienteResponse = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
};

export type ListaClienteResponse = RegistrarClienteResponse[];

export async function fetchListaCliente(): Promise<ListaClienteResponse> {
  try {
    const { data } = await api.get<ListaClienteResponse>(`/cliente`);

    return data;
  } catch (error: any) {
    if (error?.response?.data) {
      const response = new ApiErrorResponse();
      Object.assign(response, error.response.data);
      throw response;
    }
    throw new Error(error?.message ?? 'Internal server error');
  } finally {
  }
}

export async function registrarCliente(
  req: RegistrarClienteRequest,
): Promise<RegistrarClienteResponse> {
  try {
    const { data } = await api.post<RegistrarClienteResponse>(`/cliente`, req);

    return data;
  } catch (error: any) {
    if (error?.response?.data) {
      const response = new ApiErrorResponse();
      Object.assign(response, error.response.data);
      throw response;
    }
    throw new Error(error?.message ?? 'Internal server error');
  } finally {
  }
}
