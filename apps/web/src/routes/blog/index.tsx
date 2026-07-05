import { createFileRoute } from '@tanstack/react-router'
import { BlogScreen } from '@repo/app/src/features/blog/screen.tsx';

export const Route = createFileRoute('/blog/')({
  component: BlogScreen,
})

