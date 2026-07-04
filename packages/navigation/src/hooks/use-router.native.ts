import { useRouter as useExpoRouter } from 'expo-router'

export type Router = {
  back: () => void
  push: (href: string) => void
}

// Native router — maps the cross-platform surface onto expo-router.
export function useRouter(): Router {
  const router = useExpoRouter()
  return {
    back: () => router.back(),
    push: (href) => router.push(href as never),
  }
}
