import { OutlinedButton } from 'components/MUI'
import { darken } from 'polished'
import { Button as RebassButton, ButtonProps as ButtonPropsOriginal } from 'rebass/styled-components'
import styled from 'styled-components'

type ButtonProps = Omit<ButtonPropsOriginal, 'css'>

export const Base = styled(RebassButton)<
  {
    padding?: string
    width?: string
    $borderRadius?: string
    altDisabledStyle?: boolean
  } & ButtonProps
>`
  font-family: ${({ theme }) => theme.fontUniform};
  font-size: 24px;
  line-height: 1;
  padding: ${({ padding }) => padding ?? '25px'};
  width: ${({ width }) => width ?? '100%'};
  font-weight: 500;
  text-align: center;
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '15px'};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  will-change: transform;
  transition: transform 450ms ease;
  transform: perspective(1px) translateZ(0);

  > * {
    user-select: none;
  }

  > a {
    text-decoration: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraLarge`
    font-size: 25px;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 18px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 15px;
    padding: 13px 18px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 17px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 16px;
  `};
`

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => theme.primary1};
  color: black;
  font-weight: 500;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.primary1)};
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  }
`

export const ButtonBurgundy = styled(Base)`
  transition: background-color 0.3s;
  background-color: #f64562;
  color: #fff;

  font-family: ${({ theme }) => theme.fontUniform};
  font-weight: bold;
  line-height: 1;
  letter-spacing: 0.75px;
  border-radius: 50px;
  width: auto;
  padding: 15px 25px;

  height: 44px;
  border-radius: 22px;
  font-size: 15px;

  border: 1px solid transparent;

  &:focus {
    background-color: #2d2137;
    border: 1px solid #f64562;
    color: #f64562;
  }
  &:hover {
    background-color: #2d2137;
    border: 1px solid #f64562;
    color: #f64562;
  }
  &:active {
    background-color: #2d2137;
    border: 1px solid #f64562;
    color: #f64562;
  }
`
export const ButtonGradient = styled(ButtonBurgundy)`
  background: linear-gradient(90deg, #f56738 12.38%, #f64562 51.8%, #e138f5 91.43%),
    linear-gradient(0deg, #1f283c, #1f283c);
  color: ${({ theme }) => theme.text1};
  box-sizing: border-box;
  border: 0px;
  padding: 15px 25px !important;
  transition: background-color 0.3s;

  &:hover {
    background: #33334b;
    color: ${({ theme }) => theme.text1};
    outline: none;
    border: 0px;
  }
  &:focus {
    color: ${({ theme }) => theme.text1};
    outline: none;
    border: 0px;
  }
  &:disabled {
    background: #33334b;
    color: ${({ theme }) => theme.text1};
    outline: none;
    border: 0px;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 12px
  `};
`

export const StakeButton = styled(OutlinedButton).attrs(({ theme }) => ({
  $color: theme.slightlyDesaturatedLimeGreen,
}))`
  padding: 0 30px;
  align-self: flex-start;
  padding: 0 30px;
  height: 40px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 15px;
`

const ButtonPrimaryRed = styled(Base)`
  transition: background-color 0.3s;
  background-color: #f64562;
  color: ${({ theme }) => theme.text1};
  border-radius: 50px;
  width: auto;
  padding: 15px 25px;

  &:focus {
    background-color: #f64562;
    color: #fff;
  }
  &:hover {
    background-color: #f64562;
    color: #fff;
  }
  &:active {
    background-color: #f64562;
    color: #fff;
  }
`
const ButtonTableUnstake = styled(ButtonPrimaryRed)`
  background-color: #f56738;
  color: #fff;
  box-shadow: none;
  border: 1px solid transparent;
  line-height: 1;
  &:focus {
    background-color: #2b2330;
    color: #f56738;
    border: 1px solid #f56738;
  }
  &:hover {
    background-color: #2b2330;
    color: #f56738;
    border: 1px solid #f56738;
  }
  &:active {
    background-color: #2b2330;
    color: #f56738;
    border: 1px solid #f56738;
  }
`
const ButtonGreen2 = styled(ButtonPrimaryRed)`
  background-color: #1fad1f;
  color: #fff;
  box-shadow: none;
  border: 1px solid transparent;
  line-height: 1;
  &:focus {
    background-color: #202136;
    color: #1fad1f;
    border: 1px solid #1fad1f;
  }
  &:hover {
    background-color: #202136;
    color: #1fad1f;
    border: 1px solid #1fad1f;
  }
  &:active {
    background-color: #202136;
    color: #1fad1f;
    border: 1px solid #1fad1f;
  }
`
const ButtonOrange = styled(ButtonPrimaryRed)`
  background-color: #f56738;
  color: #fff;
  box-shadow: none;
  border: 1px solid transparent;
  line-height: 1;
  &:focus {
    background-color: #202136;
    color: #f56738;
    border: 1px solid #f56738;
  }
  &:hover {
    background-color: #202136;
    color: #f56738;
    border: 1px solid #f56738;
  }
  &:active {
    background-color: #202136;
    color: #f56738;
    border: 1px solid #f56738;
  }
`
export const ButtonPurple = styled(ButtonPrimaryRed)`
  background-color: #e138f5;
  color: #fff;
  box-shadow: none;
  border: 1px solid transparent;
  line-height: 1;
  &:focus {
    background-color: #281f3c;
    color: #e138f5;
    border: 1px solid #e138f5;
  }
  &:hover {
    background-color: #281f3c;
    color: #e138f5;
    border: 1px solid #e138f5;
  }
  &:active {
    background-color: #281f3c;
    color: #e138f5;
    border: 1px solid #e138f5;
  }
`
const ButtonJustRed = styled(ButtonPrimaryRed)`
  background-color: #f64562;
  color: #fff;
  box-shadow: none;
  border: 1px solid transparent;
  line-height: 1;
  &:focus {
    background-color: #2d2137;
    color: #f64562;
    border: 1px solid #f64562;
  }
  &:hover {
    background-color: #2d2137;
    color: #f64562;
    border: 1px solid #f64562;
  }
  &:active {
    background-color: #2d2137;
    color: #f64562;
    border: 1px solid #f64562;
  }
`
const ButtonDefaultBlue = styled(ButtonPrimaryRed)`
  background-color: #146ebe;
  color: #fff;
  box-shadow: none;
  border: 1px solid transparent;
  line-height: 1;
  &:focus {
    background-color: #211f3c;
    color: #146ebe;
    border: 1px solid #146ebe;
  }
  &:hover {
    background-color: #211f3c;
    color: #146ebe;
    border: 1px solid #146ebe;
  }
  &:active {
    background-color: #211f3c;
    color: #146ebe;
    border: 1px solid #146ebe;
  }
`
const ButtonGrey = styled(ButtonPrimaryRed)`
  box-shadow: none;
  background-color: #202136;
  color: #9998b8;
  border: 1px solid #9998b8;

  font-family: 'Font Awesome 6 Pro';
  font-weight: bold;
  display: inline-block;
  text-align: center;
  align-items: center;

  padding: 10px 40px;

  &:hover {
    background-color: #202136;
    color: #9998b8;
    border: 1px solid #9998b8;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraLarge`
    font-size: 25px;
    padding: 15.5px 40px;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 18px;
    padding: 12px 40px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 17px;
    padding: 11.5px 40px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 17px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 16px;
  `};
`

const ButtonYellow = styled(ButtonPrimaryRed)`
  transition: background-color 0.3s;
  background-color: #f8ac00;
  color: #202136;
  box-sizing: border-box;
  border: 1px solid transparent;

  font-family: ${({ theme }) => theme.fontUniform};
  font-weight: bold;
  width: auto;

  min-height: 40px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 15px;
  color: ${({ theme }) => theme.borderDai};
  padding: 0 27px;

  &:focus {
    background-color: rgb(248, 172, 0, 0.05);
    border: 1px solid #f8ac00;
    color: #f8ac00;
  }
  &:hover {
    background-color: rgb(248, 172, 0, 0.05);
    border: 1px solid #f8ac00;
    color: #f8ac00;
  }
  &:active {
    background-color: rgb(248, 172, 0, 0.05);
    border: 1px solid #f8ac00;
    color: #f8ac00;
  }
`

export const ButtonLight = styled(Base)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primaryText1};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
  }
`

export const ButtonSecondary = styled(Base)`
  color: ${({ theme }) => theme.primary1};
  background-color: transparent;
  font-size: 16px;
  border-radius: 50px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`

export const ButtonEmpty = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.primary1};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: underline;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
`

const ButtonConfirmedStyle = styled(Base)`
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text1};
`

const ButtonRedStyle = styled(Base)`
  background-color: ${({ theme }) => theme.red};
  border: 1px solid ${({ theme }) => theme.red};
  padding: 25px;
  width: initial;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.red)};
    background-color: ${({ theme }) => darken(0.05, theme.red)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.red)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red)};
    background-color: ${({ theme }) => darken(0.1, theme.red)};
  }
`
export const ButtonCancel = styled(Base)`
  color: ${({ theme }) => theme.text5};
  border: 1px solid ${({ theme }) => theme.text5};
  background-color: transparent;
  font-size: 16px;
  border-radius: 50px;
  width: initial;
  padding: 10px 20px;

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`

function ButtonRed({ ...rest }: { active?: boolean } & ButtonProps) {
  return <ButtonConfirmedStyle {...rest} />
}

export function ButtonVote({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (active) {
    return <ButtonRedStyle {...rest} />
  } else {
    return <ButtonYellow {...rest} />
  }
}

export function ButtonBoost({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (active) {
    return <ButtonRedStyle {...rest} />
  } else {
    return <ButtonBurgundy {...rest} />
  }
}

export function ButtonStake({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (active) {
    return <ButtonRedStyle {...rest} />
  } else {
    return <ButtonGreen2 {...rest} />
  }
}
export function ButtonUnstake({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (active) {
    return <ButtonRedStyle {...rest} />
  } else {
    return <ButtonTableUnstake {...rest} />
  }
}

export function ButtonOrangeStaking({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (active) {
    return <ButtonRedStyle {...rest} />
  } else {
    return <ButtonOrange {...rest} />
  }
}
export function ButtonRedSecond({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (active) {
    return <ButtonRedStyle {...rest} />
  } else {
    return <ButtonJustRed {...rest} />
  }
}
export function ButtonBlue({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (active) {
    return <ButtonRedStyle {...rest} />
  } else {
    return <ButtonDefaultBlue {...rest} />
  }
}

export function ButtonPair({ ...rest }: { active?: boolean } & ButtonProps) {
  return <ButtonPrimaryRed {...rest} />
}

export function ButtonLetSee({ ...rest }: { active?: boolean } & ButtonProps) {
  return <ButtonPrimaryRed {...rest} />
}

export function ButtonClaim({ ...rest }: { active?: boolean } & ButtonProps) {
  return <ButtonYellow {...rest} />
}
