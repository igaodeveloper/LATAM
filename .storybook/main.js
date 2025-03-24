const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/react',
  async viteFinal(config) {
    return mergeConfig(config, {
      // Add any custom Vite configuration here
    });
  },
}; 