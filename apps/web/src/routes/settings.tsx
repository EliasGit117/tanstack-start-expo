import { createFileRoute } from '@tanstack/react-router';
import { SettingsScreen } from '@app/features/settings/screen';

export const Route = createFileRoute('/settings')({
  component: SettingsScreen
});
