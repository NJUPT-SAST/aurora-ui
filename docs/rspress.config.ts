import * as path from "path";
import { defineConfig } from "rspress/config";
import { pluginPlayground } from "@rspress/plugin-playground";
import { pluginPreview } from "@rspress/plugin-preview";
import { remarkMermaid } from "@theguild/remark-mermaid";

export default defineConfig({
  plugins: [
    // pluginPlayground({
    //   include: ["@sast/ui-universal"],
    //   defaultRenderMode: "pure",
    // }),
    pluginPreview( ),
  ],
  globalUIComponents: [
    path.join(__dirname, "docs", "tools", "wraper", "index.tsx"),
  ],
  root: path.join(__dirname, "docs"),
  title: "Aurora UI",
  description: "🌏 UI component library for the future",
  icon: "/sast-ui-logo-icon.svg",
  logo: {
    light: "/aurora-ui-logo-light.svg",
    dark: "/aurora-ui-logo-dark.svg",
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
