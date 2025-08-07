import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async config => {
    // 优化构建配置
    if (config.build) {
      config.build.chunkSizeWarningLimit = 1000;
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        output: {
          ...config.build.rollupOptions?.output,
          manualChunks: {
            vendor: ["react", "react-dom"],
            icons: ["react-icons"],
          },
        },
      };
    }

    // 确保 legacy 插件配置正确
    if (config.plugins) {
      const legacyPlugin = config.plugins.find(
        plugin => plugin.name === "vite:legacy"
      );
      if (legacyPlugin) {
        // 确保 legacy 插件配置正确
        legacyPlugin.config = {
          ...legacyPlugin.config,
          renderLegacyChunks: true,
        };
      }
    }

    return config;
  },
};
export default config;
