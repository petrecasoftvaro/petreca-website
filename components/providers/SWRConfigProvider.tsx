"use client";

import { SWRConfig, SWRConfiguration } from "swr";

/**
 * Configura o SWR para reduzir revalidações automáticas e retries desnecessários.
 * O useUser do Auth0 usa SWR internamente e, por padrão:
 * - Revalida ao focar na aba, reconectar na rede, etc (causa re-renders)
 * - Quando não logado, /auth/profile retorna 401 e SWR fica retentando em loop
 *
 * revalidateOnFocus/reconnect: false - evita verificações ao trocar de aba
 * revalidateIfStale: true (padrão) - permite refetch ao voltar do login
 * errorRetryCount: 0 - evita loop de retry no 401
 */
const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  // Desabilita retry em erro - evita loop de "Unauthorized" quando usuário não está logado
  errorRetryCount: 0,
};

export default function SWRConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}