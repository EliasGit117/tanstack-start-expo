import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { View } from 'react-native';
import { Text } from '@app/components/ui/text';

const getServerData = createServerFn({ method: 'GET' }).handler(async () => {
  return {
    message: 'Rendered from the server',
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
      <Text className="text-xl">Server Function Test</Text>
      <Text>{data.message}</Text>
      <Text>time: {data.time}</Text>
      <Text>node: {data.node}</Text>
    </View>
  );
}
