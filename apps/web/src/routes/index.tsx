import { createFileRoute } from '@tanstack/react-router'
import { HomeScreen } from '@repo/app'

export const Route = createFileRoute('/')({ component: HomeScreen })
