import { Typography } from '@mui/material'
import Button from 'components/MUI/Button/index'
import styled from 'styled-components'

export const GradientButtonContained = styled(Button)`
  background: linear-gradient(90deg, #fe5e00 5.52%, #f64562 49.87%, #c22de1 96.15%);
  height: 40px;
  padding: 0 27px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 700;
  color: white;
`

export const GradientText = styled(Typography)<{ $gradientColor: string; $bgColor?: string }>`
  background: ${({ $gradientColor }) => $gradientColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 15px;
  font-weight: 700;
`

export const GradientButtonOutlined = styled(Button)<{ $gradientColor: string; $bgColor?: string }>`
  height: 40px;
  padding: 12px 32px;
  border-radius: 20px;
  color: white;

  &,
  &:hover {
    border: none;
  }

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: ${({ $gradientColor }) => $gradientColor};
    -webkit-mask: ${({ $bgColor }) => `linear-gradient(${$bgColor} 0 0) content-box,linear-gradient(${$bgColor} 0 0);`};
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  &:hover {
    background: ${({ $gradientColor }) => $gradientColor};
    p {
      background: unset;
      -webkit-text-fill-color: unset;
      color: white;
    }
  }

  &.Mui-disabled {
    &:hover {
      background: ${({ theme }) => theme.grey};
      border: none;

      p {
        background: unset;
        -webkit-text-fill-color: unset;
        color: #7c7b96;
      }
    }

    &:before {
      content: unset;
    }
  }
`
