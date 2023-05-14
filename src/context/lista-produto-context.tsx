import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ApiErrorResponse } from '@/services/api/api';
import {
  fetchListaProdutos,
  ListaProdutosResponse,
  registraProduto,
  RegistrarProdutoRequest,
} from '@/services/api/listar-produtos';
import { amountBrl } from '@/services/utils/amount';

export type ListaProdutos = Omit<
  ListaProdutosResponse,
  'valor' | 'preco_custo'
> & {
  valor: string;
  preco_custo: string;
};
type ListaProdutosContextType = {
  produtos: ListaProdutos[];
  loading: boolean;
  error: ApiErrorResponse | null;
  fetch: () => Promise<void>;
  clearError: () => void;
  add: (req: RegistrarProdutoRequest) => Promise<void>;
};

export const ListaProdutosContext = createContext(
  {} as ListaProdutosContextType,
);

export function ListaProdutosProvider({ children }: PropsWithChildren) {
  const [produtos, setProdutos] = useState<ListaProdutos[]>([]);
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
      const result = await fetchListaProdutos();
      setProdutos(() =>
        result.map((e) => {
          return {
            ...e,
            valor: amountBrl(e.valor),
            preco_custo: amountBrl(e.preco_custo),
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

  async function add(req: RegistrarProdutoRequest): Promise<void> {
    const result = await registraProduto(req);
    const novo = [...produtos];
    novo.push({
      ...result,
      valor: amountBrl(result.valor),
      preco_custo: amountBrl(result.preco_custo),
    });
    setProdutos(() => novo);
  }

  function clearError() {
    setError(null);
  }

  return (
    <ListaProdutosContext.Provider
      value={{
        produtos,
        fetch,
        loading,
        error,
        clearError,
        add,
      }}
    >
      {children}
    </ListaProdutosContext.Provider>
  );
}
