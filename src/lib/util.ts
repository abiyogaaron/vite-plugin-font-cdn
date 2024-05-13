import type { HtmlTagDescriptor } from "vite";
import type { IFontFamily, IPluginParams } from "../types";
import { errorLog, successLog } from "./log";

type attributes = keyof Omit<IFontFamily, "url">;

export const transformFontRules = (fontFamily: IFontFamily) => {
  const attributesMap: Record<attributes, string> = {
    family: "family",
    display: "display",
    stretch: "stretch",
    style: "style",
    variant: "variant",
    weight: "weight",
  };

  const fontFaceAttr: string[] = [];
  Object.entries(fontFamily).forEach(([key, value]) => {
    if (!attributesMap[key as attributes]) {
      return;
    }

    const attrPrefix = attributesMap[key as attributes];
    let attrValue = value;
    if (attrPrefix === "family") {
      attrValue = `"${attrValue}"`;
    }
    fontFaceAttr.push(`font-${attrPrefix}: ${attrValue};`);
  });
  return fontFaceAttr;
};

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

export const generateFontFace = (options: IPluginParams): HtmlTagDescriptor => {
  const fontFaceArr = options.fontFamilies.map((font) => {
    const fontFaceString = ["@font-face {", `  src: url("${font.url}");`, ...transformFontRules(font), "}"].join("\n");

    successLog(`Generating @font-face ===> ${fontFaceString}`);
    return fontFaceString;
  });

  const children = fontFaceArr.join("\n\n");
  return {
    tag: "style",
    attrs: {
      type: "text/css",
    },
    children: `\n${children}\n`,
  };
};
