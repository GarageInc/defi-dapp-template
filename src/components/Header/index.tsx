import useScrollPosition from '@react-hook/window-scroll'
import { AlmostHere, useWarningFlag } from 'components/WarningWrapper/WarningWrapper'
import { SupportedChainId } from 'constants/chainsinfo'
import { isMobile } from 'react-device-detect'
import { Flex, Text } from 'rebass'
import { useDarkModeManager } from 'state/user/hooks'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'

import Logo from '../../assets/svg/logo.svg'
import { useActiveWeb3React } from '../../hooks/web3'
import { formatDecimal } from '../../utils/numberWithCommas'
import { AddAppToken } from '../AddToken/AddToken'
import Web3Status from '../Web3Status'
import NetworkSelector from './NetworkSelector'

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: ${({ showBackground }) => (showBackground ? 'none' : 'grid')};
  display: grid;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 70px;
  top: 0;
  z-index: 21;
  position: fixed;
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;

  background-color: #27273f;
  border-radius: 0 0 24px 24px;
  box-shadow: 0px 5px 10px rgb(0 0 0 / 20%);
  padding: 10px 25px;

  grid-template-columns: 250px 1fr auto;

  ${({ theme }) => theme.mediaWidth.upToExtraLarge`
    grid-template-columns: 250px 1fr auto;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: 250px 1fr auto;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 200px 1fr auto;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 200px 1fr auto;
  `};
  ${({ theme }) => theme.mediaWidth.upToTablet`
    grid-template-columns: 200px 1fr auto;
    padding-right: 18px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding-right: 15px;
    grid-template-columns:  1fr 0fr 4fr;
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    justify-content: flex-end;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ active }) => (!active ? '#33334b' : '#33334b')};
  border-radius: 50px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  padding: 0px 25px;
  min-width: auto !important;

  ${({ theme }) => theme.mediaWidth.upToProSmall`
    padding: 0px 10px;
    font-size: 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 15px;
    line-height: 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: auto;
  text-decoration: none !important;

  :hover {
    cursor: pointer;
  }
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s;

  width: 50px;
  height: 50px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 40px;
    height: 40px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 36px;
    height: 36px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 36px;
  height: 36px;
  `};
`

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  image-rendering: pixelated;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 40px;
    height: 40px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 36px;
    height: 36px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 42px;
    height: 42px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 24px;
    height: 24px;
    padding: 0;
  `};
`

const ZooTokenWrapper = styled.div`
  margin-right: 20px;
`

const Divider = styled.div`
  display: inline-block;
  width: 1px;
  height: 20px;
  margin: 0 12px;
  background-color: #54546c;
`

const Web3StatusStyled = styled(Web3Status)<{ $connected: boolean }>`
  ${({ theme, $connected }) =>
    $connected &&
    theme.mediaWidth.upToSmall`
    p {
      display: none;
    }
  `};
`

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const [darkMode] = useDarkModeManager()

  const scrollY = useScrollPosition()

  const { notSupportedChain } = useWarningFlag()

  const isValid = !notSupportedChain

  const showAlmost = account && notSupportedChain && !isMobile

  return (
    <>
      {showAlmost ? (
        <AlmostHere />
      ) : (
        <HeaderFrame showBackground={scrollY > 16}>
          <Flex>
            <Title href="https://xapp.com" target="_blank">
              <Icon>
                <LogoImg width="auto" src={Logo} alt="logo" />
              </Icon>
            </Title>
          </Flex>

          <HeaderControls>
            {isValid && <ZooTokenWrapper>{account ? <AddAppToken /> : null}</ZooTokenWrapper>}
            {account && <NetworkSelector />}

            <HeaderElement>
              <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                {account && isValid ? (
                  <BalanceText>
                    {formatDecimal(ZERO)}
                    &nbsp; XFI{' '}
                    {chainId === SupportedChainId.ARBITRUM_ONE && (
                      <>
                        <Divider /> {formatDecimal(ZERO)} GLP
                      </>
                    )}
                  </BalanceText>
                ) : null}
                <Web3StatusStyled $connected={!!account} />
              </AccountElement>
            </HeaderElement>
          </HeaderControls>
        </HeaderFrame>
      )}
    </>
  )
}
