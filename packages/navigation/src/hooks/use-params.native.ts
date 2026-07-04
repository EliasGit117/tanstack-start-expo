import { useLocalSearchParams } from 'expo-router'

// Native params — reads the dynamic route segments (e.g. `[id]`) from
// expo-router.
export function useParams<T extends Record<string, string>>(): T {
  return useLocalSearchParams() as T
}
