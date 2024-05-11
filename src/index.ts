import type { PluginOption } from "vite";
import { errorLog } from "./lib/log";
import { generateFontHtmlTag } from "./lib/util";
import { IFontFamily, IPluginParams } from "./types";

const VitePluginFontCdn = (options: IPluginParams): PluginOption => {
  const plugin: PluginOption = { name: "vite-plugin-font-cdn" };

  plugin.transformIndexHtml = () => {
    if (!options) {
      errorLog("config plugin not available.");
      throw new Error("config plugin not available.");
    }
    if (options.fontFamilies.length === 0) {
      errorLog("config plugin not available.");
      throw new Error("font families empty.");
    }

    const tags = generateFontHtmlTag(options);

    return tags;
  };
  return plugin;
};

export { IPluginParams, IFontFamily };
export default VitePluginFontCdn;
