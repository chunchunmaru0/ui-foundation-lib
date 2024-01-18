import type { Preview } from "@storybook/react";
import "../src/app/globals.css"; // replace with the name of your tailwind css file
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themes } from "@storybook/theming";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // darkMode: {
    //   // Override the default dark theme
    //   dark: { ...themes.dark, appBg: "black" },
    //   // Override the default light theme
    //   light: { ...themes.normal, appBg: "red" },
    // },
  },
};
export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
    attributeName: "data-mode",
  }),
];
export default preview;
