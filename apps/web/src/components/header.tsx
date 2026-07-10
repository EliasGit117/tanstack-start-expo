import { View } from 'react-native';
import { Link } from '@tanstack/react-router';
import { buttonTextVariants, buttonVariants } from '@app/components/ui/button';
import { Text } from '@app/components/ui/text';
import { cn } from '@app/lib/utils';
import type { ComponentProps, FC } from 'react';
import { m } from '@app/paraglide/messages';


export const Header: FC<ComponentProps<typeof View>> = () => {

  return (
    <View className="flex flex-row items-center gap-4 px-4 py-2">
      <Link
        to="/"
        className={cn(buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' }))}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>{m['features.home.tab']()}</Text>
      </Link>

      <Link
        to="/rsc"
        className={cn(buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' }))}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>{m['features.header.rsc']()}</Text>
      </Link>

      <Link
        to="/blog"
        className={cn(buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' }))}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>{m['features.blog.tab']()}</Text>
      </Link>

      <Link
        to="/settings"
        className={cn(buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' }))}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>{m['features.settings.title']()}</Text>
      </Link>
    </View>
  );
}