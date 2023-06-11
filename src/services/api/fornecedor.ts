import { api, ApiErrorResponse } from '@/services/api/api';

export type RegistrarFornecedorRequest = {
  nome: string;
  telefone: string;
  email?: string | null;
  site?: string | null;
};

export type RegistrarFornecedorResponse = {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  site?: string;
};

export type ListaFornecedorResponse = RegistrarFornecedorResponse[];

export async function fetchListaFornecedor(): Promise<ListaFornecedorResponse> {
  try {
    const { data } = await api.get<ListaFornecedorResponse>(`/fornecedor`);

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

export async function registrarFornecedor(
  req: RegistrarFornecedorRequest,
): Promise<RegistrarFornecedorResponse> {
  try {
    const { data } = await api.post<RegistrarFornecedorResponse>(
      `/fornecedor`,
      req,
    );

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
