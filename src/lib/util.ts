import type { HtmlTagDescriptor } from "vite";
import type { IPluginParams } from "../types";
import { errorLog, successLog } from "./log";

export const checkFormat = (ext: string | undefined) => {
  const formatMap: Record<string, string> = {
    woff: "woff",
    woff2: "woff2",
    ttf: "ttf",
    otf: "otf",
    eot: "eot",
    svg: "svg",
    svgz: "svg",
  };
  return ext ? formatMap[ext] : false;
};

export const generateFontHtmlTag = (options: IPluginParams): HtmlTagDescriptor[] => {
  return options.fontFamilies.map((font, idx) => {
    const ext = font.url.split(".").pop();

    if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(font.url)) {
      errorLog(`font cdn url {${idx}} is not valid`);
      throw new Error(`font cdn url{${idx}} is not valid`);
    }
    if (!checkFormat(ext)) {
      errorLog(`font cdn extension format {${idx}} is not valid`);
      throw new Error(`font cdn extension format {${idx}} is not valid`);
    }

    successLog(`Generating link tag ===> ${font.url}`);
    return {
      tag: "link",
      injectTo: "head-prepend",
      attrs: {
        href: font.url.trim(),
        as: "font",
        type: `font/${ext}`,
        crossorigin: "anonymous",
        rel: options.isPreload ? "preload" : undefined,
      },
    };
  });
};

// export const generateFontFace = (options: IPluginParams) => {
//   for (const font of options.fontFamilies) {

//   }
// }
