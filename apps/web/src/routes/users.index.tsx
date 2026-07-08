import { createFileRoute } from '@tanstack/react-router'
import { UserListScreen } from '@app/features/user/list-screen';

export const Route = createFileRoute('/users/')({
  component: UserListScreen
})
