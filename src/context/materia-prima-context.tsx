import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ApiErrorResponse } from '@/services/api/api';
import {
  fetchListaMateriaPrima,
  registraMateriaPrima,
  RegistrarMateriaPrimaRequest,
} from '@/services/api/materia-prima';
import { amountBrl } from '@/services/utils/amount';

export type ListaMateriaPrima = {
  id: string;
  nome: string;
  descricao: string;
  valor_unitario: string;
};
type MateriaPrimaContextType = {
  materiaPrima: ListaMateriaPrima[];
  loading: boolean;
  error: ApiErrorResponse | null;
  fetch: () => Promise<void>;
  clearError: () => void;
  add: (req: RegistrarMateriaPrimaRequest) => Promise<void>;
};

export const MateriaPrimaContext = createContext({} as MateriaPrimaContextType);

export function MateriaPrimaProvider({ children }: PropsWithChildren) {
  const [materiaPrima, setMateriaPrima] = useState<ListaMateriaPrima[]>([]);
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
      const result = await fetchListaMateriaPrima();
      setMateriaPrima(() =>
        result.map((e) => {
          return { ...e, valor_unitario: amountBrl(e.valor_unitario) };
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

  async function add(req: RegistrarMateriaPrimaRequest): Promise<void> {
    const result = await registraMateriaPrima(req);
    const novo = [...materiaPrima];
    novo.push({ ...result, valor_unitario: amountBrl(result.valor_unitario) });
    setMateriaPrima(() => novo);
  }

  function clearError() {
    setError(null);
  }

  return (
    <MateriaPrimaContext.Provider
      value={{
        materiaPrima,
        fetch,
        loading,
        error,
        clearError,
        add,
      }}
    >
      {children}
    </MateriaPrimaContext.Provider>
  );
}
