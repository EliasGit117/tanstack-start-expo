import {
  HeadContent,
  Scripts,
  createRootRouteWithContext, Link
} from '@tanstack/react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactNativeWebStyleTag } from '@/components/style-tag.tsx';
import { View } from 'react-native';
import appCss from '../styles.css?url';
import { getLocale } from '@repo/app/src/paraglide/runtime';
import { buttonTextVariants, buttonVariants } from '@repo/app/src/components/ui/button';
import { Text } from '@repo/app/src/components/ui/text';
import type { ReactNode } from 'react';


interface IRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Starter' }
    ],
    links: [
      { rel: 'stylesheet', href: appCss }
    ]
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => <p>Not Found</p>
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale}>
    <head title="TanStack Start Starter">
      <ReactNativeWebStyleTag/>
      <HeadContent/><title></title>
    </head>
    <body>
    <View className="flex flex-row items-center gap-4 px-4 py-2">
      <Link
        to="/"
        className={buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' })}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>Home</Text>
      </Link>

      <Link
        to="/rsc"
        className={buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' })}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>RSC</Text>
      </Link>

      <Link
        to="/blog"
        className={buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' })}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>Blog</Text>
      </Link>

      <Link
        to="/settings"
        className={buttonVariants({ variant: 'link', className: 'flex px-0.5 py-0.5' })}
        activeProps={{ 'data-active': 'true' }}
      >
        <Text className={buttonTextVariants({ variant: 'link' })}>Settings</Text>
      </Link>
    </View>
    {children}

    <TanStackDevtools
      config={{ position: 'bottom-right' }}
      plugins={[
        { name: 'TanStack Router', render: <TanStackRouterDevtoolsPanel/> },
        { name: 'TanStack Query', render: <ReactQueryDevtoolsPanel/> }
      ]}
    />
    <Scripts/>
    </body>
    </html>
  );
}
