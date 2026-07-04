import { useRouter as useTanstackRouter } from '@tanstack/react-router'

export type Router = {
  back: () => void
  push: (href: string) => void
}

// Web router — thin wrapper over @tanstack/react-router, exposing the
// cross-platform surface the shared screens rely on.
export function useRouter(): Router {
  const router = useTanstackRouter()
  return {
    back: () => router.history.back(),
    push: (href) => router.navigate({ to: href }),
  }
}
