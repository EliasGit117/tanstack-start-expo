import { createFileRoute } from '@tanstack/react-router';
import { SettingsScreen } from '@repo/app/src/features/settings/screen.tsx';

export const Route = createFileRoute('/settings')({
  component: SettingsScreen
});
