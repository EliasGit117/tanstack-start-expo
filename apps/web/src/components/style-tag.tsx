import { StyleSheet } from 'react-native';

export function ReactNativeWebStyleTag() {
  if (typeof document != 'undefined')
    return null;

  const sheet = StyleSheet.getSheet();

  return (
    <style dangerouslySetInnerHTML={{ __html: sheet.textContent }} id={sheet.id}/>
  );
}