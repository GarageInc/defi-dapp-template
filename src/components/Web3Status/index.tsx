import { useWeb3React } from '@web3-react/core'
import StatusIcon from 'components/Identicon/StatusIcon'
import { getConnection } from 'connection'
import { useConnectionReady } from 'connection/eagerlyConnect'
import { ConnectionMeta, getPersistedConnectionMeta, setPersistedConnectionMeta } from 'connection/meta'
import { useActiveWeb3React } from 'hooks/web3'
import { darken } from 'polished'
import { useEffect, useMemo, useRef } from 'react'
import { ReactElement } from 'react'
import { isMobile } from 'react-device-detect'
import { TransactionDetails } from 'state/transactions/types'
import styled, { css } from 'styled-components'

import useENSName from '../../hooks/useENSName'
import { useHasSocks } from '../../hooks/useSocksBalance'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { shortenAddress } from '../../utils'
import { ButtonSecondary } from '../Button'
import Loader from '../Loader'
import { RowBetween } from '../Row'
import WalletModal from '../WalletModal'

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 15px 25px;
  border-radius: 50px;
  cursor: pointer;
  user-select: none;

  :focus {
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 8px 12px;
  `};
`
const Web3StatusError = styled(Web3StatusGeneric)`
  color: ${({ theme }) => theme.white};
  margin: 0px;
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  background-color: #2d2137;
  padding: 15px 25px;
  transition: all 0.3s;

  :hover {
    color: ${({ theme }) => theme.primaryText1};
    background-color: #f64562;
    p {
      color: #fff;
    }
  }

  ${({ faded }) =>
    faded &&
    css`
      color: ${({ theme }) => theme.primaryText1};

      :hover,
      :focus {
        color: ${({ theme }) => darken(0.05, theme.primaryText1)};
      }
    `}

  p {
    font-family: ${({ theme }) => theme.fontUniform};
    font-weight: bold;
    color: #f64562;

    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.75px;
    margin: 0;
  }
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background-color: ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg0)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;
  :hover,
  :focus {
  }
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  width: fit-content;
  font-weight: 500;
  font-size: 22px;
  line-height: 20px;

  ${({ theme }) => theme.mediaWidth.upToExtraLarge`
    font-size: 24px;
    line-height: 20px;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 18px;
    line-height: 20px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 15px;
    line-height: 18px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 15px;
    line-height: 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 15px;
    line-height: 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 12px;
    line-height: 14px;
  `};
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function Sock() {
  return (
    <span role="img" aria-label="has socks emoji" style={{ marginTop: -4, marginBottom: -4 }}>
      🧦
    </span>
  )
}

export function StatusIconWrapper({ size }: { size: number }) {
  const { account, connector } = useActiveWeb3React()
  if (isMobile || !account) {
    return null
  }

  const connection = getConnection(connector)

  return <StatusIcon account={account} connection={connection} size={size} />
}

function Web3StatusInner({ text, className }: IWebStatus) {
  const { account, connector } = useActiveWeb3React()
  const { ENSName, loading: ENSLoading } = useENSName(account)

  const connectionReady = useConnectionReady()

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length
  const hasSocks = useHasSocks()
  const toggleWalletModal = useWalletModalToggle()

  const connection = getConnection(connector)

  // Display a loading state while initializing the connection, based on the last session's persisted connection.
  // The connection will go through three states:
  // - startup:       connection is not ready
  // - initializing:  account is available, but ENS (if preset on the persisted initialMeta) is still loading
  // - initialized:   account and ENS are available
  // Subsequent connections are always considered initialized, and will not display startup/initializing states.
  const initialConnection = useRef(getPersistedConnectionMeta())
  const isConnectionInitializing = Boolean(
    initialConnection.current?.address === account && initialConnection.current?.ENSName && ENSLoading
  )
  const isConnectionInitialized = connectionReady && !isConnectionInitializing
  // Clear the initial connection once initialized so it does not interfere with subsequent connections.
  useEffect(() => {
    if (isConnectionInitialized) {
      initialConnection.current = undefined
    }
  }, [isConnectionInitialized])
  // Persist the connection if it changes, so it can be used to initialize the next session's connection.
  useEffect(() => {
    if (account || ENSName) {
      const meta: ConnectionMeta = {
        type: connection.type,
        address: account,
        ENSName: ENSName ?? undefined,
      }
      setPersistedConnectionMeta(meta)
    }
  }, [ENSName, account, connection.type])

  if (account) {
    return (
      <Web3StatusConnected
        id="web3-status-connected"
        onClick={toggleWalletModal}
        pending={hasPendingTransactions}
        className={className}
      >
        {hasPendingTransactions ? (
          <RowBetween>
            <Text>
              {pending?.length} <>Pending</>
            </Text>{' '}
            <Loader stroke="white" />
          </RowBetween>
        ) : (
          <>
            {hasSocks ? <Sock /> : null}
            <Text>{ENSName || shortenAddress(account)}</Text>
          </>
        )}
        {!hasPendingTransactions && connector && <StatusIconWrapper size={20} />}
      </Web3StatusConnected>
    )
  } else {
    return (
      <Web3StatusConnect className={className} id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
        <Text>{text ? text : <>Connect Wallet</>}</Text>
      </Web3StatusConnect>
    )
  }
}

interface IWebStatus {
  text?: ReactElement
  className?: string
}

export default function Web3Status({ text, className }: IWebStatus) {
  const { account } = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)

  return (
    <>
      <Web3StatusInner text={text} className={className} />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
