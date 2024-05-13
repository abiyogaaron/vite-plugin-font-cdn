import type { Plugin } from "vite";
import { errorLog } from "./lib/log";
import { generateFontFace, generateFontHtmlTag } from "./lib/util";
import { IFontFamily, IPluginParams } from "./types";

const VitePluginFontCdn = (options: IPluginParams) => {
  return {
    name: "vite-plugin-font-cdn",
    transformIndexHtml() {
      if (!options) {
        errorLog("config plugin is not available.");
        throw new Error("config plugin is not available.");
      }
      if (options.fontFamilies.length === 0) {
        errorLog("font families are empty.");
        throw new Error("font families are empty.");
      }

      const htmlTag = generateFontHtmlTag(options);
      const styleTag = generateFontFace(options);

      htmlTag.push(styleTag);

      return htmlTag;
    },
    generateBundle() {},
  } satisfies Plugin;
};

export { IPluginParams, IFontFamily };
export default VitePluginFontCdn;
