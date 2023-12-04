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
  upToSmall: 1366,
  upToMedium: 1536,
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
const black = '#282E3F'

function colors(darkMode: boolean): Colors {
  return {
    // base
    white: darkMode ? black : white,
    black: darkMode ? white : black,

    // text
    text1: darkMode ? white : black, // changed
    text2: darkMode ? '#9998B8' : '#565A69',
    text3: darkMode ? '#8F96AC' : '#6E727D',
    text4: darkMode ? '#B2B9D2' : '#C3C5CB',

    red: darkMode ? '#FC60A8' : '#FC60A8', // changed
    grey: darkMode ? '#33334B' : '#33334B',

    // backgrounds / greys
    bg0: darkMode ? '#F8FAFF' : '#F8FAFF', // changed, block background
    bg1: darkMode ? '#f4f5fc' : '#f4f5fc', // changed, main background
    bg2: darkMode ? '#27273F' : '#EDEEF2',
    bg3: darkMode ? '#40444F' : '#CED0D9',

    boxShadow: darkMode ? '0px 4px 20px 0px rgba(40, 46, 63, 0.08)' : '0px 4px 20px 0px rgba(40, 46, 63, 0.08)',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',

    //primary colors
    primary1: darkMode ? '#33334b' : '#E8006F',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',

    // color text
    primaryText1: darkMode ? '#438BF0' : '#D50066',

    // other
    red1: darkMode ? '#f64562' : '#DA2D2B',
    green1: darkMode ? '#A6F787' : '#007D35',
    blue1: darkMode ? '#FFFFFF' : '#0068FC',

    gradient1: 'linear-gradient(90deg, #fe5e00 -28.6%, #f64562 52.03%, #c22de1 136.17%)',
  }
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

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
