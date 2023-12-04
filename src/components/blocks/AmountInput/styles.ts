import { TextField, Typography } from '@mui/material'
import Dropdown from 'components/Dropdown'
import { Box, Button } from 'components/MUI'
import styled from 'styled-components'

export const AmountValueInput = styled(TextField)`
  .MuiOutlinedInput-root {
    background-color: ${({ theme }) => theme.grey};
    border-radius: 23px;

    padding-left: 20px;

    &.MuiInputBase-adornedStart {
      padding-left: 16px;
    }

    &.MuiInputBase-adornedEnd {
      padding-right: 0;
    }

    .MuiInputAdornment-positionStart {
      margin-right: 12px;
    }

    .MuiInputAdornment-positionEnd {
      margin-left: 5px;
    }

    .MuiInputAdornment-root {
      max-height: unset;
      height: unset;
    }

    .MuiInputBase-input {
      padding: 11px 0;
      color: white;
      font-size: 16px;

      ::-webkit-search-decoration {
        -webkit-appearance: none;
      }

      [type='number'] {
        -moz-appearance: textfield;
      }

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      ::placeholder {
        color: ${({ theme }) => theme.text2};
      }
    }

    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border-width: 1px;
        border-color: rgba(255, 255, 255, 0.3);
      }
    }

    .MuiOutlinedInput-notchedOutline {
      border-width: 0;
    }
  }
`

export const MaxButton = styled(Button).attrs({
  variant: 'outlined',
})`
  font-weight: bold;
  color: ${({ theme }) => theme.text1};
  font-size: 13px;
  height: 30px;
  min-width: 55px;
  border-radius: 15px;
  margin-right: 12px;

  &,
  &:hover {
    border-color: ${({ theme }) => theme.text1};
  }
`

export const Symbol = styled.img``

export const BalanceText = styled(Typography)`
  font-size: 13px;
`

export const Picker = styled(Dropdown)`
  .Dropdown-placeholder {
    ${BalanceText} {
      display: none;
    }

    ${({ theme }) => theme.mediaWidth.upToSmall`
      margin: 0;
    `};
  }

  .Dropdown-control {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      min-width: 100px;
      padding-left: 8px;
    `};
  }

  .Dropdown-arrow {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      display: none;
    `};
  }

  .Dropdown-menu {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      min-width: 220px;
    `};
  }
`

export const RightTokenBox = styled(Box)`
  flex-direction: row;
  align-items: center;
  width: 110px;
  padding-left: 12px;

  p {
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
    font-size: 13px;
    margin-left: 6px;
  }
`

export const Divider = styled(Box)`
  width: 1px;
  align-self: stretch;
  background-color: #46465f;
`

export const PickerLabel = styled(Box)`
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12px;  
  `};
`
