import { createFileRoute } from '@tanstack/react-router'
import { UserDetailScreen } from '@repo/app'

export const Route = createFileRoute('/users/$id')({ component: UserDetailScreen })
