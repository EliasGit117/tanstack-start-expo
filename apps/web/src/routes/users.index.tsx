import { createFileRoute } from '@tanstack/react-router'
import { UserListScreen } from '@repo/app'

export const Route = createFileRoute('/users/')({ component: UserListScreen })
