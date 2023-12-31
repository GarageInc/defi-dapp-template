import { darken } from 'polished'
import { Button as RebassButton, ButtonProps as ButtonPropsOriginal } from 'rebass/styled-components'
import styled from 'styled-components'

type ButtonProps = Omit<ButtonPropsOriginal, 'css'>

const Base = styled(RebassButton)<
  {
    padding?: string
    width?: string
    $borderRadius?: string
    altDisabledStyle?: boolean
  } & ButtonProps
>`
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

export function ButtonSwitch({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (active) {
    return <ButtonRedStyle {...rest} />
  } else {
    return <ButtonYellow {...rest} />
  }
}

const ButtonPrimaryRed = styled(Base)`
  transition: background-color 0.3s;
  background-color: #f64562;
  color: ${({ theme }) => theme.text1};
  border-radius: 50px;
  width: auto;
  padding: 15px 25px;

  &:focus {
    background-color: #f64562;
    color: ${({ theme }) => theme.white};
  }
  &:hover {
    background-color: #f64562;
    color: ${({ theme }) => theme.white};
  }
  &:active {
    background-color: #f64562;
    color: ${({ theme }) => theme.white};
  }
`
const ButtonTableUnstake = styled(ButtonPrimaryRed)`
  background-color: #f56738;
  color: ${({ theme }) => theme.white};
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
  color: ${({ theme }) => theme.white};
  box-shadow: none;
  border: 1px solid transparent;
  line-height: 1;
  &:focus {
    background-color: #f8faff;
    color: #1fad1f;
    border: 1px solid #1fad1f;
  }
  &:hover {
    background-color: #f8faff;
    color: #1fad1f;
    border: 1px solid #1fad1f;
  }
  &:active {
    background-color: #f8faff;
    color: #1fad1f;
    border: 1px solid #1fad1f;
  }
`
const ButtonOrange = styled(ButtonPrimaryRed)`
  background-color: #f56738;
  color: ${({ theme }) => theme.white};
  box-shadow: none;
  border: 1px solid transparent;
  line-height: 1;
  &:focus {
    background-color: #f8faff;
    color: #f56738;
    border: 1px solid #f56738;
  }
  &:hover {
    background-color: #f8faff;
    color: #f56738;
    border: 1px solid #f56738;
  }
  &:active {
    background-color: #f8faff;
    color: #f56738;
    border: 1px solid #f56738;
  }
`

const ButtonYellow = styled(ButtonPrimaryRed)`
  transition: background-color 0.3s;
  background-color: #f8ac00;
  color: #f8faff;
  box-sizing: border-box;
  border: 1px solid transparent;

  font-weight: bold;
  width: auto;

  min-height: 40px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 15px;
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

export const ButtonRedStyle = styled(Base)`
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

export function ButtonClaim({ ...rest }: { active?: boolean } & ButtonProps) {
  return <ButtonYellow {...rest} />
}
