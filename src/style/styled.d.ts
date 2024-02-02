import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    cardColor: string;
    cardTextColor: string;
    cardHeadColor: string;
    accentColor: string;
    semiAccentColor: string;
    lineColor: string;
    borderFormColor: string;
  }
}
