import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ApiErrorResponse } from '@/services/api/api';
import {
  fetchListaPedidos,
  ListaPedidosResponse,
  registraPedido,
  RegistrarPedidoRequest,
} from '@/services/api/listar-pedidos';
import { amountBrl } from '@/services/utils/amount';

type ItemDataGrid = {
  id: string;
  quantidade: number;
  produto: string;
  total: string;
  valor_unitario: string;
};

export type ListaPedidos = Omit<
  ListaPedidosResponse,
  'valor' | 'item_pedido'
> & {
  valor: string;
  item_pedido: ItemDataGrid[];
};
type ListaPedidosContextType = {
  pedidos: ListaPedidos[];
  loading: boolean;
  error: ApiErrorResponse | null;
  fetch: () => Promise<void>;
  clearError: () => void;
  add: (req: RegistrarPedidoRequest) => Promise<void>;
};

export const ListaPedidosContext = createContext({} as ListaPedidosContextType);

export function ListaPedidosProvider({ children }: PropsWithChildren) {
  const [pedidos, setPedidos] = useState<ListaPedidos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  useEffect(() => {
    async function init() {
      await fetch();
    }
    init();
  }, []);
  async function fetch(): Promise<void> {
    try {
      setLoading(true);
      const result = await fetchListaPedidos();
      setPedidos(() =>
        result.map((e) => {
          return {
            id: e.id,
            nome: e.nome,
            valor: amountBrl(e.valor),
            status: e.status,
            data_entrega: e.data_entrega,
            data_inclusao: e.data_inclusao,
            item_pedido: e.item_pedido.map((item) => {
              return {
                id: item.id,
                quantidade: item.quantidade,
                produto: item.produto,
                total: amountBrl(item.total),
                valor_unitario: amountBrl(item.valor_unitario),
              };
            }),
          };
        }),
      );
    } catch (error: any) {
      if (error instanceof ApiErrorResponse) {
        setError(error);
      } else {
        setError({
          status: 500,
          title: 'Internal Error',
          detail: error?.message,
          type: '',
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function add(req: RegistrarPedidoRequest): Promise<void> {
    await registraPedido(req);
    await fetch();
  }

  function clearError() {
    setError(null);
  }

  return (
    <ListaPedidosContext.Provider
      value={{
        pedidos,
        fetch,
        loading,
        error,
        clearError,
        add,
      }}
    >
      {children}
    </ListaPedidosContext.Provider>
  );
}
