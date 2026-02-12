"use client"

import { SWRConfig } from "swr"

const profileRoute =
  process.env.NEXT_PUBLIC_PROFILE_ROUTE || "/auth/profile"

/**
 * Previne retries infinitos do useUser (Auth0) quando o usuário não está logado (401).
 * O SWR faz retry por padrão em erros; para 401 isso é inútil e causa muitas requisições.
 */
export function Auth0SWRConfig({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        onErrorRetry: (error, key, _config, revalidate, { retryCount }) => {
          const isProfileRoute =
            typeof key === "string" &&
            (key.includes(profileRoute) || key.includes("/auth/profile"))
          const isUnauthorized =
            error?.message === "Unauthorized" || error?.message?.includes("401")

          if (isProfileRoute && isUnauthorized) {
            return
          }
          if (retryCount >= 3) return
          setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000)
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
