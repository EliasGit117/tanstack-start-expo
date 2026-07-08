/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/src/**/*.{js,jsx,ts,tsx}',
    '../../packages/navigation/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('../../packages/app/tailwind.preset')],
  important: 'html',
}
