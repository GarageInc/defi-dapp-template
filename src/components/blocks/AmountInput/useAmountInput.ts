import { TextFieldProps } from '@mui/material'
import { BigNumber } from 'ethers'
import { useCallback, useMemo } from 'react'
import { escapeRegExp } from 'utils'

import { useStableCoin } from '.'

export type IPickerToken = {
  symbol: string
}

export type IAmountInput = TextFieldProps & {
  leftToken?: IPickerToken
  onMaxClicked?: () => void
  maxDisabled?: boolean
  onUserInput?: (input?: string) => void
  prependSymbol?: string
  max?: any
  rightToken?: IPickerToken
  rightTokenOptions?: IPickerToken[]
  onChangeRightToken?: (symbol: string) => void
}

export type IAmountWithMax = IAmountInput & {
  inputValue?: BigNumber
  setInputValue?: (v?: BigNumber) => void
  maxValue: BigNumber
  decimals: number
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
const toNumber = (v: string | number) => (v ? `${+v}` : undefined)

export const useAmountInput = ({
  onUserInput,
  prependSymbol,
  max,
  value: propValue,
  leftToken: leftTokenCoin,
  rightToken: rightTokenCoin,
}: IAmountInput) => {
  const enforcer = useCallback(
    (nextUserInput: string) => {
      if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
        onUserInput && onUserInput(toNumber(nextUserInput))
      }
    },
    [onUserInput]
  )

  const onChange = useCallback(
    (event: any) => {
      const value = event.target.value

      if (max) {
        if (+value > +max) {
          const newMax = typeof max === 'string' ? max.replace(/,/g, '.') : max
          enforcer(newMax)
          return
        }
      }

      if (prependSymbol) {
        // cut off prepended symbol
        const formattedValue = value.toString().includes(prependSymbol)
          ? value.toString().slice(1, value.toString().length + 1)
          : value

        // replace commas with periods, because uniswap exclusively uses period as the decimal separator
        enforcer(formattedValue.replace(/,/g, '.'))
      } else {
        enforcer(value.replace(/,/g, '.'))
      }
    },
    [enforcer, max, prependSymbol]
  )

  const value = useMemo(
    () => (prependSymbol && propValue ? prependSymbol + propValue : propValue),
    [prependSymbol, propValue]
  )

  const leftToken = useStableCoin(leftTokenCoin?.symbol)
  const rightToken = useStableCoin(rightTokenCoin?.symbol)

  return {
    value,
    onChange,
    leftToken,
    rightToken,
  }
}
