import { useParams as useTanstackParams } from '@tanstack/react-router'

// Web params — reads the dynamic route segments (e.g. `$id`) from
// @tanstack/react-router.
export function useParams<T extends Record<string, string>>(): T {
  // TanStack's structural-sharing generic can't be satisfied through this
  // platform-agnostic wrapper's own type parameter; safe — params are strings.
  return useTanstackParams({ strict: false } as never) as T
}
