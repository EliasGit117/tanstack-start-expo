import { StyleSheet } from 'react-native'

export function ReactNativeWebStyleTag() {
  if (typeof document !== 'undefined')
    return null

  const sheet = StyleSheet.getSheet()

  return (
    <style
      id={sheet.id}
      dangerouslySetInnerHTML={{ __html: sheet.textContent }}
    />
  )
}