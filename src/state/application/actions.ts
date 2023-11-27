import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@uniswap/sdk-core'
import { ReactElement } from 'react'

import { PopupType } from './reducer'

export type PopupContent =
  | {
      type: PopupType.Transaction
      hash: string
      summary?: string
    }
  | {
      type: PopupType.Order
      orderHash: string
    }
  | {
      type: PopupType.FailedSwitchNetwork
      failedSwitchNetwork: ChainId
    }
  | {
      msg: {
        title: string | ReactElement
        description?: string | ReactElement
        success: boolean
      }
    }

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  SELF_CLAIM,
  ADDRESS_CLAIM,
  CLAIM_POPUP,
  MENU,
  DELEGATE,
  VOTE,
  POOL_OVERVIEW_OPTIONS,
  ARBITRUM_OPTIONS,
  BRIDGE_ZOO,
  BRIDGE_DAI,
  BRIDGE_MODAL,
  BOOST_ZOO_ETH,
  VOTE_GLP,
  NETWORK_SELECTOR,
  ALMOST_HERE,
  DEGEN_MODE,
  COMMUNITY_ROUND_AGREEMENT,
  CLAIM_REWARDS,
  CLAIM_INCENTIVES,
  CLAIM_REWARDS_2,
  PORTFOLIO_SUCCESS,
  UNSTAKE_VOTES,
  PROJECT_VOTING,
  PROJECT_ACTIONS,
  LIQUIDITY_MINING,
}

export enum ApplicationSubModal {
  GET_LP_STAGE2,
  GET_LP_STAGE4,
  BOOST_BY_REVOTING,
}

export const updateChainId = createAction<{ chainId: number | null }>('application/updateChainId')
export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber')
export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const setOpenSubModal = createAction<ApplicationSubModal | null>('application/setOpenSubModal')
export const setOpenTimerView = createAction<boolean>('application/setOpenTimerView')
export const setctxStakingPositionId = createAction<string | null>('application/setctxStakingPositionId')
export const setctxVotingPositionId = createAction<string | null>('application/setctxVotingPositionId')
export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>(
  'application/addPopup'
)
export const removePopup = createAction<{ key: string }>('application/removePopup')
