import styled from 'styled-components'

import { AutoColumn } from '../Column'

export const Checkbox = styled.input`
  border: 1px solid ${({ theme }) => theme.red3};
  height: 20px;
  margin: 0;
`

export const PaddedColumn = styled(AutoColumn)`
  padding: 0px;
  margin: 25px 0;
`

export const SearchInput = styled.input`
  position: relative;
  display: flex;
  padding: 10px 24px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 50px;
  color: #fff;
  border-style: solid;
  border: 2px solid transparent;
  -webkit-appearance: none;
  text-align: left;
  background-color: #33334b;

  ::placeholder {
    color: #9998b8;
  }
  transition: border 100ms;
  :focus {
    border: 2px solid #f64562;
    outline: none;
  }
  font-size: 20px;
  line-height: 24px;
`

export const SeparatorDark = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`
