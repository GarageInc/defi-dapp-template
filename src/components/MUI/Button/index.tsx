import { ButtonProps } from '@mui/material'
import MuiButton from '@mui/material/Button'
import styled from 'styled-components'

const MuiButtonStyled = styled(MuiButton)`
  &.Mui-disabled {
    border: none;
    color: ${({ theme }) => theme.text1};
  }
`

const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButtonStyled variant="contained" {...props} />
}

export const OutlinedButton = styled(Button).attrs({
  variant: 'outlined',
})<{ $color: string }>`
  font-weight: bold;
  font-size: 16px;
  color: ${({ $color }) => $color};

  &,
  &:hover {
    border-color: ${({ $color }) => $color};
  }

  &:hover {
    background-color: ${({ $color }) => $color};
    color: white;
  }
`

export const ContainedButton = styled(Button).attrs({
  variant: 'outlined',
})<{ $color: string }>`
  font-weight: bold;
  font-size: 16px;
  background-color: ${({ $color }) => $color};
  color: white;

  &,
  &:hover {
    border-color: ${({ $color }) => $color};
  }

  &:hover {
    background-color: transparent;
    color: ${({ $color }) => $color};
  }
`
export default Button
