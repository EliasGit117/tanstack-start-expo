import { createFileRoute } from '@tanstack/react-router'
import { BlogScreen } from '@app/features/blog/screen';

export const Route = createFileRoute('/blog/')({
  component: BlogScreen,
})

