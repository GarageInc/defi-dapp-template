import { DEFAULT_TXN_DISMISS_MS } from 'constants/misc'
import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { AppState } from '../index'
import {
  addPopup,
  ApplicationModal,
  ApplicationSubModal,
  PopupContent,
  removePopup,
  setctxStakingPositionId,
  setctxVotingPositionId,
  setOpenModal,
  setOpenSubModal,
  setOpenTimerView,
} from './actions'

export function useModalOpen(modal: ApplicationModal | string): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useSubModalOpen(modal: ApplicationSubModal | string): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openSubModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(setOpenModal(open ? null : modal))
  }, [dispatch, modal, open])
}

export function useToggleTimerView(): () => void {
  const openTimerView = useAppSelector((state: AppState) => state.application.openTimerView)
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(setOpenTimerView(!openTimerView))
  }, [dispatch, openTimerView])
}

function useToggleSubModal(modal: ApplicationSubModal): () => void {
  const open = useSubModalOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenSubModal(open ? null : modal)), [dispatch, modal, open])
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}

export function useBridgeDaiModalToggle(): () => void {
  return useToggleModal(ApplicationModal.BRIDGE_DAI)
}

export function useBridgeModalToggle(): () => void {
  return useToggleModal(ApplicationModal.BRIDGE_MODAL)
}

export function useRevotingBoostToggle(): () => void {
  return useToggleSubModal(ApplicationSubModal.BOOST_BY_REVOTING)
}

export function useBoostZooEthToggle(stakingPositionId?: string, votingPositionId?: string) {
  const modal = ApplicationModal.BOOST_ZOO_ETH
  const open = useModalOpen(modal)

  const dispatch = useAppDispatch()

  return useCallback(
    (e?: any) => {
      e?.stopPropagation && e?.stopPropagation()
      dispatch(setOpenModal(open ? null : modal))

      dispatch(setctxStakingPositionId(stakingPositionId || null))
      dispatch(setctxVotingPositionId(votingPositionId || null))
    },
    [dispatch, modal, open, stakingPositionId, votingPositionId]
  )
}

export function useVoteGLPToggle(stakingPositionId?: string, votingPositionId?: string): () => void {
  const modal = ApplicationModal.VOTE_GLP
  const open = useModalOpen(modal)

  const dispatch = useAppDispatch()

  return useCallback(
    (e?: any) => {
      e?.stopPropagation && e?.stopPropagation()

      dispatch(setOpenModal(open ? null : modal))

      dispatch(setctxStakingPositionId(stakingPositionId || null))
      dispatch(setctxVotingPositionId(votingPositionId || null))
    },
    [dispatch, modal, open, stakingPositionId, votingPositionId]
  )
}

export function useGetLPToggle(type: ApplicationSubModal): () => void {
  return useToggleSubModal(type)
}

function useAlmostHereToggle(): () => void {
  return useToggleModal(ApplicationModal.ALMOST_HERE)
}

export function useCommunityRoundAgreementToggle(): () => void {
  return useToggleModal(ApplicationModal.COMMUNITY_ROUND_AGREEMENT)
}

export function useDegenModalToggle(): () => void {
  return useToggleModal(ApplicationModal.DEGEN_MODE)
}

export function useBridgeZooModalToggle(): () => void {
  return useToggleModal(ApplicationModal.BRIDGE_ZOO)
}
export function useToggleSettingsMenu(): () => void {
  return useToggleModal(ApplicationModal.SETTINGS)
}

function useShowClaimPopup(): boolean {
  return useModalOpen(ApplicationModal.CLAIM_POPUP)
}

function useToggleShowClaimPopup(): () => void {
  return useToggleModal(ApplicationModal.CLAIM_POPUP)
}

function useToggleSelfClaimModal(): () => void {
  return useToggleModal(ApplicationModal.SELF_CLAIM)
}

function useToggleDelegateModal(): () => void {
  return useToggleModal(ApplicationModal.DELEGATE)
}

function useToggleVoteModal(): () => void {
  return useToggleModal(ApplicationModal.VOTE)
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string, removeAfterMs?: number) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (content: PopupContent, key?: string, removeAfterMs?: number) => {
      dispatch(addPopup({ content, key, removeAfterMs: removeAfterMs ?? DEFAULT_TXN_DISMISS_MS }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useAppSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter((item) => item.show), [list])
}
