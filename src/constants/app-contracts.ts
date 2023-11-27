import erc20Abi from '../abis/erc20.json'
import { Erc20 } from '../abis/types'
import { useContract } from '../hooks/useContract'

// 0x9de882a68616fa96622ca5d032cb7f7416823b0c

export const useErc20Contract = (token?: string) => {
  return useContract<Erc20>(token, erc20Abi)
}
