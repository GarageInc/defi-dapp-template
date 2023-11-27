import { createTheme } from '@mui/material/styles'

const { palette } = createTheme()
const { augmentColor } = palette
// @ts-ignore
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } })

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    slightlyDesaturatedLimeGreen: createColor('#63C178'),
    vividBlue: createColor('#05B6F9'),
    brightViolet: createColor('#5E2FDD'),
  },
  typography: {
    fontFamily: ['Carmen Sans', 'Uniform Pro'].join(','),
  },
  spacing: 1,
  components: {
    MuiTypography: {
      defaultProps: {
        fontSize: 17,
        lineHeight: 'normal',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '0',
          lineHeight: 'normal',
          fontFamily: 'Uniform Pro',
          fontSize: 17,
        },
      },
    },
  },
})

export default muiTheme
