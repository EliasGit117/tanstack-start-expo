import { Link } from 'expo-router'
import type { ReactNode } from 'react'
import { Text } from 'react-native'

export type TextLinkProps = {
  href: string
  children: ReactNode
  /**
   * Navigate back to the target if it's already in the stack instead of
   * pushing a new copy (avoids Home-on-top-of-Home with a back arrow).
   * No-op on web, where there is no native stack.
   */
  dismissTo?: boolean
}

// Native link — expo-router resolves the path against the file-based routes.
export function TextLink({ href, children, dismissTo }: TextLinkProps) {
  return (
    <Link href={href as never} dismissTo={dismissTo} asChild>
      <Text>{children}</Text>
    </Link>
  )
}
