import { PluginOption } from "vite";
import {
  IPluginParams,
  IFontFamily,
} from './types';
import {
  generateFontHtmlTag,
} from './lib/util';
import {
  errorLog,
} from './lib/log';

const VitePluginFontCdn = (options: IPluginParams): any => {
  const plugin: PluginOption = { name: 'vite-plugin-font-cdn'};

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
  } 
  return plugin;
}

export {
  IPluginParams,
  IFontFamily,
}
export default VitePluginFontCdn;