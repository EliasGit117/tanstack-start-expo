import {
  HeadContent,
  Scripts,
  createRootRouteWithContext, Link
} from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { ReactNativeWebStyleTag } from '@/components/style-tag.tsx';
import { View } from 'react-native';
import appCss from '../styles.css?url';
import { StyleSheet } from 'react-native';


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
  shellComponent: RootDocument
});

function RootDocument({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
    <head>
      <ReactNativeWebStyleTag/>
      <HeadContent/>
    </head>
    <body>
      <View style={styles.container}>
        <Link to="/">
          Home
        </Link>
        <Link to="/rsc">
          RSC
        </Link>
        <Link to="/settings">
          Settings
        </Link>
      </View>
      {children}
    <Scripts/>
    </body>
    </html>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 16,
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  }
});