import { createFileRoute } from '@tanstack/react-router';
import { HomeScreen } from '@repo/app/src/features/home/screen.tsx';

export const Route = createFileRoute('/')({
  component: HomeScreen
});
