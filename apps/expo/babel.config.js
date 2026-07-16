module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['../..'],
          alias: {
            '@app': '../../packages/app/src',
            '@navigation': '../../packages/navigation/src',
          },
          extensions: [
            '.ios.tsx', '.android.tsx', '.web.tsx', '.tsx',
            '.ios.ts', '.android.ts', '.web.ts', '.ts',
            '.ios.jsx', '.android.jsx', '.web.jsx', '.jsx',
            '.ios.js', '.android.js', '.web.js', '.js',
            '.json',
          ],
        },
      ],
      // Must be listed last. Reanimated v4 moved the worklets transform to
      // this package (was `react-native-reanimated/plugin` in v3).
      'react-native-worklets/plugin',
    ],
  }
}
