import type { Property } from "csstype";

export interface IFontFamily {
  url: string;
  family: Property.FontFamily;
  /**
   * `font-weight` for this variant.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight
   */
  weight?: Property.FontWeight;
  /**
   * `font-stretch` for this variant.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-stretch
   */
  stretch?: Property.FontStretch;
  /**
   * `font-style` for this variant.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-style
   */
  style?: Property.FontStyle;
  /**
   * `font-display` for this variant.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
   */
  display?: "auto" | "block" | "swap" | "fallback" | "optional";
  /**
   * `font-variant` for this variant.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-variant
   */
  variant?: Property.FontVariant;
}

export interface IPluginParams {
  fontFamilies: IFontFamily[];
  isPreload: boolean;
}
