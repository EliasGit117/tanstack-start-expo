import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '@app/components/ui/text';
import { Image } from 'react-native';


export function BlogScreen() {

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      {Platform.OS === 'web' && <Text variant="h3">Blog</Text>}
      <Text variant="muted">
        Explore our blog
      </Text>

      <View style={{ width: '100%', height: 200 }}>
          <Image
            className="h-full w-full rounded-md"
            source={{ uri: 'https://images.unsplash.com/photo-1672758247442-82df22f5899e' }}
          />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'ios' ? 24 : 16,
    gap: 16,
    alignItems: 'flex-start'
  }
});
