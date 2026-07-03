// react-native is aliased to react-native-web in this app.
// `StyleSheet.getSheet()` is a react-native-web SSR API missing from react-native's types.
declare module 'react-native' {
  export namespace StyleSheet {
    function getSheet(): { id: string; textContent: string }
  }
}

export {}
