import { View } from 'react-native';
import { Link } from '@tanstack/react-router';
import { buttonTextVariants, buttonVariants } from '@repo/app/src/components/ui/button';
import { Text } from '@repo/app/src/components/ui/text';
import { cn } from '@repo/app/src/lib/utils';
import type { ComponentProps, FC } from 'react';


export const Header: FC<ComponentProps<typeof View>> = () => {

  return (
    <View className="flex flex-row items-center gap-4 px-4 py-2">
      <Link
        to="/"
        className={cn(buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' }))}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>Home</Text>
      </Link>

      <Link
        to="/rsc"
        className={cn(buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' }))}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>RSC</Text>
      </Link>

      <Link
        to="/blog"
        className={cn(buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' }))}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>Blog</Text>
      </Link>

      <Link
        to="/settings"
        className={cn(buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' }))}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>Settings</Text>
      </Link>
    </View>
  );
}