import { api, ApiErrorResponse } from '@/services/api/api';

export type ItemPedidoRequest = {
  id_produto: string;
  quantidade: number;
};

export type ItemPedidoResponse = {
  id: string;
  quantidade: number;
};

export type RegistrarPedidoRequest = {
  id_cliente: string;
  data_entrega?: Date;
  item_pedido: ItemPedidoRequest[];
};

export type RegistrarPedidoResponse = {
  id: string;
  valor: number;
  data_entrega?: Date;
  item_pedido: ItemPedidoResponse[];
};

export type ListaPedidosResponse = {
  id: string;
  nome: string;
  valor: number;
  status: string;
  data_entrega?: Date;
  data_inclusao: Date;
  item_pedido: ListaitemPedidoResponse[];
};

export type ListaitemPedidoResponse = {
  id: string;
  quantidade: number;
  produto: string;
  valor_unitario: number;
  total: number;
};

export async function fetchListaPedidos(): Promise<ListaPedidosResponse[]> {
  try {
    const { data } = await api.get<ListaPedidosResponse[]>(`/pedido`);
    console.log(data);
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

export async function registraPedido(
  req: RegistrarPedidoRequest,
): Promise<RegistrarPedidoResponse> {
  try {
    const { data } = await api.post<RegistrarPedidoResponse>(`/pedido`, req);

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
