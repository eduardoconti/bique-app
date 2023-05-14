import { api, ApiErrorResponse } from '@/services/api/api';

export type itemMateriaPrimaRequest = {
  id: string;
  quantidade: number;
};

export type itemMateriaPrimaResponse = {
  id: string;
  nome: string;
  quantidade: number;
};

export type RegistrarProdutoRequest = {
  nome: string;
  descricao: string;
  valor: number;
  materia_prima: itemMateriaPrimaRequest[];
};

export type RegistrarProdutoResponse = {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  materia_prima: itemMateriaPrimaResponse[];
  preco_custo: number;
};

export type ListaProdutosResponse = {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  materia_prima: itemMateriaPrimaResponse[];
  preco_custo: number;
};

export async function fetchListaProdutos(): Promise<ListaProdutosResponse[]> {
  try {
    const { data } = await api.get<ListaProdutosResponse[]>(`/produto`);

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

export async function registraProduto(
  req: RegistrarProdutoRequest,
): Promise<RegistrarProdutoResponse> {
  try {
    const { data } = await api.post<RegistrarProdutoResponse>(`/produto`, req);

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
