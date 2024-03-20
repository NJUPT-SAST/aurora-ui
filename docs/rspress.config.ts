import * as path from 'path';
import { defineConfig } from 'rspress/config';
import { pluginPlayground } from '@rspress/plugin-playground';

export default defineConfig({
  plugins: [pluginPlayground({ include: ['@sast/ui-universal'] })],
  root: path.join(__dirname, 'docs'),
  title: 'SAST UI DOCS',
  description: '🌏 UI component library for the future',
  // icon: '/rspress-icon.png',
  // logo: {
  //   light: '/rspress-light-logo.png',
  //   dark: '/rspress-dark-logo.png',
  // },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/NJUPT-SAST/SAST-UI' },
    ],
  },
});
