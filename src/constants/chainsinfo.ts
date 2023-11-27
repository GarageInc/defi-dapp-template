import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
import arbitrumLogoUrl from 'assets/svg/arbitrum_logo.svg'
import optimismLogoUrl from 'assets/svg/optimistic_ethereum.svg'
import ms from 'ms.macro'

import { SupportedL1ChainId, SupportedL2ChainId } from './chains'
import { ARBITRUM_LIST, OPTIMISM_LIST } from './lists'
/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  FANTOM = 250,

  MOONBEAM = 1284,
  MOONBEAM_ALPHA = 1287,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,

  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,
}

enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
}

interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1
}

interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2
  readonly bridge: string
  readonly statusPage?: string
  readonly defaultListUrl: string
}

type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

// @ts-ignore
export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.FANTOM]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://ftmscan.com/',
    label: 'Fantom',
    logoUrl: '',
    nativeCurrency: { name: 'Ftm', symbol: 'FTM', decimals: 18 },
  },
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://etherscan.io/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.RINKEBY]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://rinkeby.etherscan.io/',
    label: 'Rinkeby',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
  },
  [SupportedChainId.ROPSTEN]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://ropsten.etherscan.io/',
    label: 'Ropsten',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ropETH', decimals: 18 },
  },
  [SupportedChainId.KOVAN]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://kovan.etherscan.io/',
    label: 'Kovan',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Kovan Ether', symbol: 'kovETH', decimals: 18 },
  },
  [SupportedChainId.MOONBEAM]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://moonscan.io/',
    label: 'Moonbeam',
    logoUrl: '',
    nativeCurrency: { name: 'Glmr', symbol: 'GLMR', decimals: 18 },
  },
  [SupportedChainId.MOONBEAM_ALPHA]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://moonbase.moonscan.io/',
    label: 'Moonbeam Alpha',
    logoUrl: '',
    nativeCurrency: { name: 'Dev', symbol: 'DEV', decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://goerli.etherscan.io/',
    label: 'Görli',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
  },
  [SupportedChainId.OPTIMISM]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    label: 'Optimism',
    logoUrl: optimismLogoUrl,
    statusPage: 'https://optimism.io/status',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.OPTIMISTIC_KOVAN]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    label: 'Optimistic Kovan',
    logoUrl: optimismLogoUrl,
    statusPage: 'https://optimism.io/status',
    nativeCurrency: { name: 'Optimistic Kovan Ether', symbol: 'kovOpETH', decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: '#/battles/bridge',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://arbiscan.io/',
    label: 'Arbitrum',
    logoUrl: arbitrumLogoUrl,
    defaultListUrl: ARBITRUM_LIST,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_RINKEBY]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: '#/battles/bridge',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://rinkeby-explorer.arbitrum.io/',
    label: 'Arbitrum Rinkeby',
    logoUrl: arbitrumLogoUrl,
    defaultListUrl: ARBITRUM_LIST,
    nativeCurrency: { name: 'Rinkeby Arbitrum Ether', symbol: 'rinkArbETH', decimals: 18 },
  },
  // [SupportedChainId.POLYGON]: {
  // networkType: NetworkType.L1,
  // blockWaitMsBeforeWarning: ms`10m`,
  // bridge: 'https://wallet.polygon.technology/bridge',
  // docs: 'https://polygon.io/',
  // explorer: 'https://polygonscan.com/',
  // label: 'Polygon',
  // logoUrl: polygonMaticLogo,
  // nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
  // },
  // [SupportedChainId.POLYGON_MUMBAI]: {
  // networkType: NetworkType.L1,
  // blockWaitMsBeforeWarning: ms`10m`,
  // bridge: 'https://wallet.polygon.technology/bridge',
  // docs: 'https://polygon.io/',
  // explorer: 'https://mumbai.polygonscan.com/',
  // label: 'Polygon Mumbai',
  // logoUrl: polygonMaticLogo,
  // nativeCurrency: { name: 'Polygon Mumbai Matic', symbol: 'mMATIC', decimals: 18 },
  // },
}
