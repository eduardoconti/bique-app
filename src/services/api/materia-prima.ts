import { api, ApiErrorResponse } from '@/services/api/api';

export type RegistrarMateriaPrimaRequest = {
  nome: string;
  descricao: string;
};

export type RegistrarMateriaPrimaResponse = {
  id: string;
  nome: string;
  descricao: string;
};

export type ListaMateriaPrimaResponse = {
  id: string;
  nome: string;
  descricao: string;
  estoque_materia_prima: {
    id: string;
    custo_unitario: number;
    quantidade: number;
    data_inclusao: Date;
  }[];
};

export async function fetchListaMateriaPrima(): Promise<
  ListaMateriaPrimaResponse[]
> {
  try {
    const { data } = await api.get<ListaMateriaPrimaResponse[]>(
      `/materia-prima`,
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

export async function registraMateriaPrima(
  req: RegistrarMateriaPrimaRequest,
): Promise<RegistrarMateriaPrimaResponse> {
  try {
    const { data } = await api.post<RegistrarMateriaPrimaResponse>(
      `/materia-prima`,
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
