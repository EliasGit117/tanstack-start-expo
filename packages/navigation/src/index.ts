// Cross-platform navigation primitives. Metro resolves the `.native` variants
// on iOS/Android (expo-router); Vite resolves the bare files on web
// (@tanstack/react-router). Consumers import from `@repo/navigation` and get
// the right implementation per platform.
export { TextLink } from './components/link'
export type { TextLinkProps } from './components/link'
export { useRouter } from './hooks/use-router'
export type { Router } from './hooks/use-router'
export { useParams } from './hooks/use-params'
