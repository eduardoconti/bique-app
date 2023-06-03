import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ApiErrorResponse } from '@/services/api/api';

import {
  fetchListaFornecedor,
  registrarFornecedor,
  RegistrarFornecedorRequest,
} from '@/services/api/fornecedor';

export type Fornecedor = {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  site?: string;
};
type FornecedorContextType = {
  fornecedor: Fornecedor[];
  loading: boolean;
  error: ApiErrorResponse | null;
  fetch: () => Promise<void>;
  clearError: () => void;
  add: (req: RegistrarFornecedorRequest) => Promise<void>;
};

export const FornecedorContext = createContext({} as FornecedorContextType);

export function FornecedorProvider({ children }: PropsWithChildren) {
  const [fornecedor, setFornecedor] = useState<Fornecedor[]>([]);
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
      const result = await fetchListaFornecedor();
      setFornecedor(() => result);
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

  async function add(req: RegistrarFornecedorRequest): Promise<void> {
    const result = await registrarFornecedor(req);
    const novo = [...fornecedor];
    novo.push(result);
    setFornecedor(() => novo);
  }

  function clearError() {
    setError(null);
  }

  return (
    <FornecedorContext.Provider
      value={{
        fornecedor,
        fetch,
        loading,
        error,
        clearError,
        add,
      }}
    >
      {children}
    </FornecedorContext.Provider>
  );
}
