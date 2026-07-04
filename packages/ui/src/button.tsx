import type { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native'

export interface ButtonProps {
  children: ReactNode
  onPress?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

/**
 * Cross-platform button built on react-native primitives.
 * Runs natively on Expo (react-native) and on web (react-native-web).
 */
export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.textSecondary]}>
        {children}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    userSelect: 'none',
  },
  textSecondary: {
    color: '#2563eb',
  },
})
