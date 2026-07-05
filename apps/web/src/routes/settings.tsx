import { createFileRoute } from '@tanstack/react-router'
import { SettingsScreen } from '@repo/app'

export const Route = createFileRoute('/settings')({ component: SettingsScreen })
