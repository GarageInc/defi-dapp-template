import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export type Color = string
export interface Colors {
  // base
  white: Color
  black: Color

  fontUniform: string
  fontCarmen: string

  // text
  text1: Color
  text2: Color
  text3: Color
  text4: Color
  text5: Color
  grayscale: Color
  grayscaleAsh: Color
  textHeader: Color
  text1Reverse: Color
  red: Color
  orange: Color
  yellow: Color
  purple: Color
  green: Color

  // backgrounds / greys
  bg0: Color
  bg1: Color
  bg2: Color
  bg3: Color
  bg4: Color
  bg5: Color
  bg6: Color
  bg7: Color
  bgZoo: Color
  bgDai: Color
  borderZoo: Color
  borderDai: Color
  grey: Color

  modalBG: Color
  advancedBG: Color

  //blues
  primary1: Color
  primary2: Color
  primary3: Color
  primary4: Color
  primary5: Color

  primaryText1: Color

  // pinks
  secondary1: Color
  secondary2: Color
  secondary3: Color

  // other
  red1: Color
  red2: Color
  red3: Color
  green1: Color
  yellow1: Color
  yellow2: Color
  yellow3: Color
  blue1: Color
  blue2: Color

  blue4: Color

  error: Color
  success: Color
  warning: Color

  slightlyDesaturatedBlue: Color
  slightlyDesaturatedLimeGreen: Color
  brightViolet: Color
  brightMagenta: Color

  gradient1: string
  gradient2: string
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    grids: Grids

    // shadows
    shadow1: string

    // media queries
    mediaWidth: {
      upToPhone: ThemedCssFunction<DefaultTheme>
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToTablet: ThemedCssFunction<DefaultTheme>
      upToXSmall: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToProSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToXMedium: ThemedCssFunction<DefaultTheme>
      upToProMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
      upToExtraLarge: ThemedCssFunction<DefaultTheme>
    }

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation
    flexRowNoWrap: FlattenSimpleInterpolation
  }
}
