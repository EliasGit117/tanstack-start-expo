import {
  HeadContent,
  Scripts,
  createRootRouteWithContext
} from '@tanstack/react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactNativeWebStyleTag } from '@/components/style-tag.tsx';
import appCss from '../styles.css?url';
import { getLocale } from '@repo/app/src/paraglide/runtime';
import type { ReactNode } from 'react';
import { Header } from '@/components/header.tsx';


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

    <Header/>
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
