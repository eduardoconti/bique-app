import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ApiErrorResponse } from '@/services/api/api';

import {
  fetchListaCliente,
  registrarCliente,
  RegistrarClienteRequest,
} from '@/services/api/cliente';

export type Cliente = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
};
type ClienteContextType = {
  cliente: Cliente[];
  loading: boolean;
  error: ApiErrorResponse | null;
  fetch: () => Promise<void>;
  clearError: () => void;
  add: (req: RegistrarClienteRequest) => Promise<void>;
};

export const ClienteContext = createContext({} as ClienteContextType);

export function ClienteProvider({ children }: PropsWithChildren) {
  const [cliente, setCliente] = useState<Cliente[]>([]);
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
      const result = await fetchListaCliente();
      setCliente(() => result);
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

  async function add(req: RegistrarClienteRequest): Promise<void> {
    const result = await registrarCliente(req);
    const novo = [...cliente];
    novo.push(result);
    setCliente(() => novo);
  }

  function clearError() {
    setError(null);
  }

  return (
    <ClienteContext.Provider
      value={{
        cliente,
        fetch,
        loading,
        error,
        clearError,
        add,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}
