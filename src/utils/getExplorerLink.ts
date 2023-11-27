import { SupportedChainId } from '../constants/chainsinfo'

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  [SupportedChainId.FANTOM]: '',
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.ROPSTEN]: 'ropsten.',
  [SupportedChainId.RINKEBY]: 'rinkeby.',
  [SupportedChainId.MOONBEAM]: '',
  [SupportedChainId.MOONBEAM_ALPHA]: '',
  [SupportedChainId.GOERLI]: 'goerli.',
  [SupportedChainId.KOVAN]: 'kovan.',
  [SupportedChainId.OPTIMISM]: 'optimistic.',
  [SupportedChainId.OPTIMISTIC_KOVAN]: 'kovan-optimistic.',
}

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(chainId: number, data: string, type: ExplorerDataType): string {
  if (chainId === SupportedChainId.FANTOM) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return `https://ftmscan.com/tx/${data}`
      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return `https://ftmscan.com/address/${data}`
      case ExplorerDataType.BLOCK:
        return `https://ftmscan.com/block/${data}`
      default:
        return `https://ftmscan.com/`
    }
  }
  if (chainId === SupportedChainId.MOONBEAM) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return `https://moonscan.io/tx/${data}`
      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return `https://moonscan.io/address/${data}`
      case ExplorerDataType.BLOCK:
        return `https://moonscan.io/block/${data}`
      default:
        return `https://moonscan.io/`
    }
  }

  if (chainId === SupportedChainId.ARBITRUM_ONE) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return `https://arbiscan.io/tx/${data}`
      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return `https://arbiscan.io/address/${data}`
      case ExplorerDataType.BLOCK:
        return `https://arbiscan.io/block/${data}`
      default:
        return `https://arbiscan.io/`
    }
  }

  if (chainId === SupportedChainId.ARBITRUM_RINKEBY) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return `https://rinkeby-arbiscan.io/tx/${data}`
      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return `https://rinkeby-arbiscan.io/address/${data}`
      case ExplorerDataType.BLOCK:
        return `https://rinkeby-arbiscan.io/block/${data}`
      default:
        return `https://rinkeby-arbiscan.io/`
    }
  }

  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] ?? ''}etherscan.io`

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${prefix}/tx/${data}`

    case ExplorerDataType.TOKEN:
      return `${prefix}/token/${data}`

    case ExplorerDataType.BLOCK:
      if (chainId === SupportedChainId.OPTIMISM || chainId === SupportedChainId.OPTIMISTIC_KOVAN) {
        return `${prefix}/tx/${data}`
      }
      return `${prefix}/block/${data}`

    case ExplorerDataType.ADDRESS:
      return `${prefix}/address/${data}`
    default:
      return `${prefix}`
  }
}
