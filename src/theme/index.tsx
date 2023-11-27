import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { THEME_ID, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import React, { useMemo } from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import muiTheme from 'theme/muiTheme'

import { useIsDarkMode } from '../state/user/hooks'
import { Colors } from './styled'

// eslint-disable-next-line no-restricted-syntax
export * from './components'

type TextProps = Omit<TextPropsOriginal, 'css'>

export const MEDIA_WIDTHS = {
  upToPhone: 481,
  upToExtraSmall: 769,
  upToTablet: 1025,
  upToXSmall: 1281,
  upToSmall: 1366,
  upToProSmall: 1441,
  upToMedium: 1536,
  upToXMedium: 1680,
  upToProMedium: 1800,
  upToLarge: 1920,
  upToExtraLarge: 2560,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator: any, size) => {
    accumulator[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#9998B8' : '#565A69',
    text3: darkMode ? '#8F96AC' : '#6E727D',
    text4: darkMode ? '#B2B9D2' : '#C3C5CB',
    text5: darkMode ? '#D9DBE9' : '#EDEEF2', //
    green: darkMode ? '#1fad1f' : '#1fad1f',
    grayscale: darkMode ? '#FCFCFC' : '#FCFCFC',
    grayscaleAsh: darkMode ? '#262338' : '#262338',
    text1Reverse: darkMode ? '#000000' : '#000000',
    textHeader: darkMode ? '#ed6b1f' : '#ed6b1f',
    red: darkMode ? '#F64562' : '#F64562',
    orange: darkMode ? '#f56738' : '#f56738',
    yellow: darkMode ? '#EFFE04' : '#EFFE04',
    purple: darkMode ? `#a996ff` : '#a996ff',

    fontUniform: 'Uniform Pro',
    fontCarmen: 'Carmen Sans',
    // backgrounds / greys
    bg0: darkMode ? '#191B1F' : '#FFF',
    bg1: darkMode ? '#202136' : '#F7F8FA',
    bg2: darkMode ? '#27273F' : '#EDEEF2',
    bg3: darkMode ? '#40444F' : '#CED0D9',
    bg4: darkMode ? '#2B2330' : '#888D9B', // changed
    bg5: darkMode ? '#2D2137' : '#888D9B', // changed
    bg6: darkMode ? '#281F3C' : '#6C7284', // changed
    bg7: darkMode ? '#F64562' : '#F64562', // changed
    bgZoo: darkMode ? '#211F3C' : '#211F3C',
    bgDai: darkMode ? '#1F263C' : '#1F263C',
    borderZoo: darkMode ? '#3D7BFC' : '#3D7BFC',
    borderDai: darkMode ? '#05B6F9' : '#05B6F9',
    grey: darkMode ? '#33334B' : '#33334B',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#33334b' : '#E8006F',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary3: darkMode ? '#4D8FEA' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#FDEAF1',

    // color text
    primaryText1: darkMode ? '#438BF0' : '#D50066',

    // secondary colors
    secondary1: darkMode ? '#FFFFFF' : '#E8006F',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: darkMode ? '#f64562' : '#DA2D2B',
    red2: darkMode ? '#F82D3A' : '#DF1F38',
    red3: '#D60000',
    green1: darkMode ? '#A6F787' : '#007D35',
    yellow1: '#E3A507',
    yellow2: '#FF8F00',
    yellow3: '#F3B71E',
    blue1: darkMode ? '#FFFFFF' : '#0068FC',
    blue2: darkMode ? '#5199FF' : '#0068FC',
    error: darkMode ? '#FD4040' : '#DF1F38',
    success: darkMode ? '#27AE60' : '#007D35',
    warning: '#FF8F00',
    slightlyDesaturatedBlue: '#8483B8',
    slightlyDesaturatedLimeGreen: '#63C178',
    brightViolet: '#5E2FDD',
    brightMagenta: '#e138f5',

    // dont wanna forget these blue yet
    blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

    gradient1: 'linear-gradient(90deg, #fe5e00 -28.6%, #f64562 52.03%, #c22de1 136.17%)',
    gradient2: 'linear-gradient(114deg, #7433FF 0%, #FFA3FD 100%)',
  }
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}
// eslint-disable-next-line import/no-unused-modules -- used in styled.d.ts
export function getTheme(darkMode: boolean) {
  return {
    darkMode,
    ...theme(darkMode),
  }
}

const cache = createCache({
  key: 'css',
  prepend: true,
})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()
  const themeObject = useMemo(
    () => ({
      ...getTheme(darkMode),
    }),
    [darkMode]
  )

  return (
    <CacheProvider value={cache}>
      <StyledComponentsThemeProvider theme={themeObject}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={{ [THEME_ID]: muiTheme }}>{children}</MuiThemeProvider>
        </StyledEngineProvider>
      </StyledComponentsThemeProvider>
    </CacheProvider>
  )
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
  font-family: ${({ theme }) => theme.fontUniform};
  font-weight: bold;
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color="text2" {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color="primary1" {...props} />
  },
  label(props: TextProps) {
    return <TextWrapper fontWeight={600} color="text1" {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color="text1" {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color="white" {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color="text1" {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color="blue1" {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color="yellow3" {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color="text3" {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color="bg3" {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle="italic" color="text2" {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1} !important;
}

a {
 color: ${({ theme }) => theme.blue1}; 
}
`
