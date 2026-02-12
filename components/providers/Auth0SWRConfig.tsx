"use client"

import { SWRConfig } from "swr"

/**
 * Previne chamadas repetidas ao auth/profile quando o usuário não está logado (401).
 * - errorRetryCount: 0 → sem retries em erro
 * - revalidateOnMount: false → evita refetch no remount (React Strict Mode)
 * - revalidateOnFocus: false → evita refetch ao focar a janela
 * - dedupingInterval: 60000 → evita requisições duplicadas em 60s
 */
export function Auth0SWRConfig({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 0,
        revalidateOnMount: false,
        revalidateOnFocus: false,
        dedupingInterval: 60_000,
      }}
    >
      {children}
    </SWRConfig>
  )
}
