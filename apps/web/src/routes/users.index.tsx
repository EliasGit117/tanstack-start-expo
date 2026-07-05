import { createFileRoute } from '@tanstack/react-router'
import { UserListScreen } from '@repo/app/src/features/user/list-screen.tsx';

export const Route = createFileRoute('/users/')({
  component: UserListScreen
})
