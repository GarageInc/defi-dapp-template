import { CHAIN_INFO, SupportedChainId } from 'constants/chainsinfo'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useRef } from 'react'
import { ArrowDownCircle, ChevronDown } from 'react-feather'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import styled from 'styled-components'
import { ExternalLink, MEDIA_WIDTHS } from 'theme'

import { switchToNetwork } from '../../utils/switchToNetwork'

const ActiveRowLinkList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  & > a {
    align-items: center;
    color: ${({ theme }) => theme.text2};
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;
    padding: 8px 0 4px;
    text-decoration: none;
  }
  & > a:first-child {
    margin: 0;
    margin-top: 0px;
    padding-top: 10px;
  }
`
const ActiveRowWrapper = styled.div`
  background-color: ${({ theme }) => theme.grey};
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  width: 100%;
`
const FlyoutHeader = styled.div`
  color: ${({ theme }) => theme.text2};
  font-weight: 400;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 15px;
    margin: 5px 0 0 5px !important;
  `};
`
const FlyoutMenu = styled.div`
  position: absolute;
  top: 50px;
  width: 272px;
  z-index: 99;
  padding-top: 10px;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    left: 3px;
    top: 61px;
    right: 3px;
    width: unset;
  `};
`
const FlyoutMenuContents = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.grey};
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15);

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  overflow: auto;
  padding: 16px;

  & > *:not(:last-child) {
    margin-bottom: 12px;
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
    padding: 5px;
  `};
`
const FlyoutRow = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.grey : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  text-align: left;
  width: 100%;
`
const FlyoutRowActiveIndicator = styled.div`
  background-color: ${({ theme }) => theme.green1};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`

const CircleContainer = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
`

const LinkOutCircle = styled(ArrowDownCircle)`
  transform: rotate(230deg);
  width: 16px;
  height: 16px;
`
const Logo = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 8px;
`
const NetworkLabel = styled.div`
  flex: 1 1 auto;
`
const SelectorLabel = styled(NetworkLabel)`
  display: block;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    display: block;
    font-size: 14px;
  `};
`
const SelectorControls = styled.div<{ interactive: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.grey};
  border-radius: 50px;
  color: ${({ theme }) => theme.text1};
  cursor: ${({ interactive }) => (interactive ? 'pointer' : 'auto')};
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 13px 25px;
  margin-right: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-right: 5px;
  `};

  ${({ theme }) => theme.mediaWidth.upToProSmall`
    margin-right: 20px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin-right: 0;
    padding: 9px 13px;
  `};
`

const SelectorLogo = styled(Logo)<{ interactive?: boolean }>`
  margin-right: ${({ interactive }) => (interactive ? 8 : 0)}px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-right: 8px;
  }
`
const SelectorWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    position: relative;
  }
`
const StyledChevronDown = styled(ChevronDown)`
  width: 16px;
`
const BridgeLabel = ({ chainId }: { chainId: SupportedChainId }) => {
  switch (chainId) {
    case SupportedChainId.ARBITRUM_ONE:
    case SupportedChainId.ARBITRUM_RINKEBY:
      return <>Arbitrum Bridge</>
    case SupportedChainId.OPTIMISM:
    case SupportedChainId.OPTIMISTIC_KOVAN:
      return <>Optimism Bridge</>
    default:
      return <>Bridge</>
  }
}
const ExplorerLabel = ({ chainId }: { chainId: SupportedChainId }) => {
  switch (chainId) {
    case SupportedChainId.ARBITRUM_ONE:
    case SupportedChainId.ARBITRUM_RINKEBY:
      return <>Arbiscan</>
    case SupportedChainId.OPTIMISM:
    case SupportedChainId.OPTIMISTIC_KOVAN:
      return <>Optimistic Etherscan</>
    case SupportedChainId.FANTOM:
      return <>Ftmscan</>
    case SupportedChainId.MOONBEAM:
      return <>Moonscan</>
    default:
      return <>Etherscan</>
  }
}

function Row({
  targetChain,
  onSelectChain,
}: {
  targetChain: SupportedChainId
  onSelectChain: (targetChain: number) => void
}) {
  const { library, chainId } = useActiveWeb3React()
  if (!library || !chainId) {
    return null
  }
  const active = chainId === targetChain

  const { explorer, bridge, label, logoUrl } = CHAIN_INFO[targetChain]

  const rowContent = (
    <FlyoutRow onClick={() => onSelectChain(targetChain)} active={active}>
      <Logo src={logoUrl} />
      <NetworkLabel>{label}</NetworkLabel>
      {chainId === targetChain && (
        <CircleContainer>
          <FlyoutRowActiveIndicator />
        </CircleContainer>
      )}
    </FlyoutRow>
  )

  if (active) {
    return (
      <ActiveRowWrapper>
        {rowContent}
        <ActiveRowLinkList>
          {explorer && (
            <ExternalLink href={explorer}>
              <ExplorerLabel chainId={chainId} />
              <CircleContainer>
                <LinkOutCircle />
              </CircleContainer>
            </ExternalLink>
          )}
        </ActiveRowLinkList>
      </ActiveRowWrapper>
    )
  }
  return rowContent
}

export const useHandleChainSwitch = (toggle?: (targetChain: number) => void) => {
  const { library } = useActiveWeb3React()

  const handleChainSwitch = useCallback(
    (targetChain: number, skipToggle?: boolean) => {
      if (!library?.provider) return
      switchToNetwork({ provider: library.provider, chainId: targetChain })
        .then(() => {
          if (!skipToggle) {
            toggle && toggle(targetChain)
          }
        })
        .catch((error) => {
          console.error('Failed to switch networks', error)

          // we want app network <-> chainId param to be in sync, so if user changes the network by changing the URL
          // but the request fails, revert the URL back to current chainId

          if (!skipToggle) {
            toggle && toggle(targetChain)
          }
        })
    },
    [library, toggle]
  )

  return handleChainSwitch
}

export default function NetworkSelector() {
  const { chainId, library } = useActiveWeb3React()
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.NETWORK_SELECTOR)
  const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR)
  useOnClickOutside(node, open ? toggle : undefined)

  const info = chainId ? CHAIN_INFO[chainId] : undefined

  const handleChainSwitch = useHandleChainSwitch()

  if (!chainId || !info || !library) {
    return null
  }

  return (
    <SelectorWrapper ref={node as any}>
      <SelectorControls interactive onClick={toggle}>
        <SelectorLogo interactive src={info.logoUrl} />
        <SelectorLabel>{info.label}</SelectorLabel>
        <StyledChevronDown />
      </SelectorControls>
      {open && (
        <FlyoutMenu>
          <FlyoutMenuContents>
            <FlyoutHeader>
              <>Switch network</>
            </FlyoutHeader>
            <Row onSelectChain={handleChainSwitch} targetChain={SupportedChainId.ARBITRUM_ONE} />
          </FlyoutMenuContents>
        </FlyoutMenu>
      )}
    </SelectorWrapper>
  )
}
