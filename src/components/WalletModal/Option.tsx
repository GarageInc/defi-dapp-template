import { useWeb3React } from '@web3-react/core'
import Loader from 'components/Loader'
import { ActivationStatus, useActivationState } from 'connection/activate'
import { Connection } from 'connection/types'
import { useActiveWeb3React } from 'hooks/web3'
import styled from 'styled-components'
import { flexColumnNoWrap, flexRowNoWrap } from 'theme/styles'

const InfoCard = styled.button<{ active?: boolean }>`
  background-color: ${({ theme, active }) => (active ? theme.bg3 : theme.bg2)};
  padding: 15px 25px;
  outline: none !important;
  border: 2px solid #33334b;
  border-radius: 50px;
  width: 100% !important;
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.primary1};
  }
`

const OptionCardLeft = styled.div`
  ${flexColumnNoWrap};
  flex-direction: row;
  align-items: center;
`

const OptionCard = styled(InfoCard as any)`
  background-color: #33334b;
  border: 2px solid #33334b;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 15px 25px;
  box-shadow: 5px 10px 20px rgb(0 0 0 / 20%);
  transition: box-shadow 0.5s ease-in;
  :hover,
  :active {
    border: 2px solid #f64562 !important;
    box-shadow: 6px 12px 24px rgb(0 0 0 / 25%);
    background-color: #33334b !important;
  }

  :focus {
    box-shadow: 5px 10px 20px rgb(0 0 0 / 20%);
  }
`

const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean }>`
  margin-top: 0;
  pointer-events: ${({ clickable }) => (clickable ? 'all' : 'none')};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
  border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.primary1}` : ``)};
  opacity: ${({ disabled, selected }) => (disabled && !selected ? '0.5' : '1')};
`

const HeaderText = styled.div`
  ${flexRowNoWrap};
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 535;
  padding: 0 8px;
  color: ${({ theme }) => theme.white};
`
const IconWrapper = styled.div`
  ${flexRowNoWrap};
  align-items: center;
  gap: 8px;
  justify-content: center;
  img {
    border-radius: 12px;
  }
  & > img,
  span {
    height: 40px;
    width: 40px;
  }
`

const GreenCircle = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.green1};
    border-radius: 50%;
  }
`

const CircleWrapper = styled.div`
  color: ${({ theme }) => theme.green1};
  display: flex;
  justify-content: center;
  align-items: center;
`

interface OptionProps {
  connection: Connection
}

const noop = () => {
  console.log('noop')
}

export default function Option({ connection }: OptionProps) {
  const { connector } = useActiveWeb3React()

  const { activationState, tryActivation } = useActivationState()
  const { chainId } = useWeb3React()
  const activate = () => tryActivation(connection, noop, chainId)

  const isSomeOptionPending = activationState.status === ActivationStatus.PENDING
  const isCurrentOptionPending = isSomeOptionPending && activationState.connection.type === connection.type

  const active = connection.connector === connector

  return (
    <OptionCardClickable
      onClick={activate}
      active={active}
      disabled={isSomeOptionPending}
      selected={isCurrentOptionPending}
      clickable={!active && !isCurrentOptionPending}
    >
      <OptionCardLeft>
        <HeaderText>
          {active ? (
            <CircleWrapper>
              <GreenCircle>
                <div />
              </GreenCircle>
            </CircleWrapper>
          ) : (
            ''
          )}
          {connection.getName()}
        </HeaderText>
      </OptionCardLeft>

      <IconWrapper>
        {isCurrentOptionPending && <Loader stroke="white" />}
        <img src={connection.getIcon?.(false)} alt={connection.getName()} />
      </IconWrapper>
    </OptionCardClickable>
  )
}
