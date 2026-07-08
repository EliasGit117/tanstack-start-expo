import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export type TextLinkProps = {
  href: string
  children: ReactNode
  /** Native-only: pop back to the target route instead of pushing. Ignored on web. */
  dismissTo?: boolean
}

// Web link — renders a real anchor via @tanstack/react-router so navigation
// is client-side with preloading.
export function TextLink({ href, children }: TextLinkProps) {
  return (
    <Link to={href}>
      {children}
    </Link>
  )
}
