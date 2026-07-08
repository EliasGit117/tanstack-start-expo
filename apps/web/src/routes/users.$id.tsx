import { createFileRoute } from '@tanstack/react-router';
import { UserDetailScreen } from '@app/features/user/detail-screen';

export const Route = createFileRoute('/users/$id')({
  component: UserDetailScreen
});
