import * as path from "path";
import { defineConfig } from "rspress/config";
import { pluginPlayground } from "@rspress/plugin-playground";
import { remarkMermaid } from "@theguild/remark-mermaid";

export default defineConfig({
  plugins: [pluginPlayground({ include: ["@sast/ui-universal"] })],
  root: path.join(__dirname, "docs"),
  title: "SAST UI DOCS",
  description: "🌏 UI component library for the future",
  icon: "/sast-ui-logo-icon.svg",
  logo: {
    light: "/sast-ui-logo-color.svg",
    dark: "/sast-ui-logo-dark.svg",
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/NJUPT-SAST/SAST-UI",
      },
    ],
  },
  markdown: {
    remarkPlugins: [[remarkMermaid]],
  },
});
