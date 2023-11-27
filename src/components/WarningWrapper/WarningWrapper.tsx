import { ButtonVote as BtnSwitch } from 'components/Button'
import { useHandleChainSwitch } from 'components/Header/NetworkSelector'
import { SupportedChainId } from 'constants/chainsinfo'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useActiveWeb3React } from '../../hooks/web3'
import connectBg from './../../assets/images/bg-nfts.svg'

const StyledRow = styled.div`
  width: 100%;
  height: 100%;
  background: url('${connectBg}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 10px 20px rgb(0 0 0 / 20%);
  border-radius: 50px;

  padding: 25px 120px;
  border-radius: 24px;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    padding-left: 22px;
    padding-right: 22px;
  `};
`

const ContentWarningStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 100px;
  align-items: center;
  margin: auto;

  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mediaWidth.upToXSmall`
    grid-gap: 10px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    grid-template-columns: 1fr;    
  `};
`

const Title = styled.div`
  font-family: ${({ theme }) => theme.fontUniform};
  font-weight: bold;
  font-size: 65px;
  line-height: 70px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 45px;
    line-height: normal;
  `};

  ${({ theme }) => theme.mediaWidth.upToPhone`
    font-size: 40px;
  `};
`

const Left = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`

export default function WarningWrapper({ children }: IProps) {
  const { account, notSupportedChain } = useWarningFlag()

  return <>{account ? !notSupportedChain ? children : <FightBanner /> : <FightBanner />}</>
}

const FightBanner = () => (
  <StyledRow>
    <ContentWarningStyled>
      <Left>
        <Title>Swap Xfi</Title>
      </Left>
    </ContentWarningStyled>
  </StyledRow>
)

const Hidden = styled.div`
  display: none;
  height: 0px;
`

export const AlmostHere = () => {
  const { chainId } = useActiveWeb3React()

  const handleChainSwitch = useHandleChainSwitch()

  const toggleChain = useCallback(() => {
    handleChainSwitch(SupportedChainId.ARBITRUM_ONE, true)
  }, [handleChainSwitch])

  if (chainId !== SupportedChainId.MOONBEAM) {
    return (
      <ConfirmBlock>
        <Suggestion>
          <>Page is working on the Moonbeam Network. Please Switch to the Moonbeam Network to continue</>
        </Suggestion>

        <SwitchBtn onClick={toggleChain} active>
          <>Switch Network</>
        </SwitchBtn>
      </ConfirmBlock>
    )
  }

  if (chainId !== SupportedChainId.MOONBEAM && chainId !== SupportedChainId.ARBITRUM_ONE) {
    return (
      <ConfirmBlock>
        <SwitchBtn onClick={toggleChain} active>
          <>Switch Network</>
        </SwitchBtn>
      </ConfirmBlock>
    )
  }

  return null
}

const SwitchBtn = styled(BtnSwitch)`
  margin-left: 83px;
  width: initial;
  border: 1px solid ${({ theme }) => theme.white};
  border-radius: 50px;
  padding: 16px 36px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      margin: 28px 0 0 0;
      width: 100%;
    `};
`

const Suggestion = styled.div`
  font-weight: bold;
`

const ConfirmBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px;
  color: ${({ theme }) => theme.text1};
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  background-color: ${({ theme }) => theme.red};
  font-family: ${({ theme }) => theme.fontUniform};
  width: 100%;
  height: 70px;
  border-radius: 0 0 24px 24px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      flex-direction: column;
      border-radius: 24px 24px 0 0 ;
      height: auto;
    `};
`

interface IProps {
  children?: React.ReactNode
}

export const useWarningFlag = () => {
  const { account, chainId } = useActiveWeb3React()

  if (!chainId) {
    return {
      notSupportedChain: false,
      account,
    }
  }

  return {
    notSupportedChain: chainId !== SupportedChainId.MOONBEAM && chainId !== SupportedChainId.ARBITRUM_ONE,
    account,
  }
}
