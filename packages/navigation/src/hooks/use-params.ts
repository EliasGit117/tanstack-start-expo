import { useParams as useTanstackParams } from '@tanstack/react-router'

// Web params — reads the dynamic route segments (e.g. `$id`) from
// @tanstack/react-router.
export function useParams<T extends Record<string, string>>(): T {
  return useTanstackParams({ strict: false }) as T
}
