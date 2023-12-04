import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export type Color = string
export interface Colors {
  // base
  white: Color
  black: Color

  // text
  text1: Color
  text2: Color
  text3: Color
  text4: Color

  red: Color
  grey: Color

  // backgrounds / greys
  bg0: Color
  bg1: Color
  bg2: Color
  bg3: Color

  boxShadow: Color

  modalBG: Color

  //blues
  primary1: Color
  primary2: Color

  primaryText1: Color

  // other
  red1: Color
  green1: Color
  blue1: Color

  gradient1: string
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    // media queries
    mediaWidth: {
      upToPhone: ThemedCssFunction<DefaultTheme>
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToTablet: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
      upToExtraLarge: ThemedCssFunction<DefaultTheme>
    }

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation
    flexRowNoWrap: FlattenSimpleInterpolation
  }
}
