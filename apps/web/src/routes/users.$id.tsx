import { createFileRoute } from '@tanstack/react-router';
import { UserDetailScreen } from '@repo/app/src/features/user/detail-screen.tsx';

export const Route = createFileRoute('/users/$id')({
  component: UserDetailScreen
});
