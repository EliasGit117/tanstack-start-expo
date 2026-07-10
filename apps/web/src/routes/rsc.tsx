import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { View } from 'react-native';
import { Text } from '@app/components/ui/text';
import { m } from '@app/paraglide/messages';

const getServerData = createServerFn({ method: 'GET' }).handler(async () => {
  return {
    message: m['features.rsc.message'](),
    time: new Date().toISOString(),
    node: process.version
  };
});

export const Route = createFileRoute('/rsc')({
  component: RscTest,
  loader: () => getServerData(),
  preloadStaleTime: 10_000,
  staleTime: 10_000
});

function RscTest() {
  const data = Route.useLoaderData();

  return (
    <View className="flex flex-col gap-4 p-4">
      <Text className="text-xl">{m['features.rsc.title']()}</Text>
      <Text>{data.message}</Text>
      <Text>{m['features.rsc.time']({ time: data.time })}</Text>
      <Text>{m['features.rsc.node']({ node: data.node })}</Text>
    </View>
  );
}
