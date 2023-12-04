import './App.scss'

import UniwalletModal from 'components/AccountDetails/UniwalletModal'
import { useIsMobileDevice } from 'components/blocks/Header'
import Header from 'components/Header/Header'
import Polling from 'components/Header/Polling'
import Loader from 'components/Loader'
import { Box } from 'components/MUI'
import WarningWrapper from 'components/WarningWrapper/WarningWrapper'
import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import ErrorBoundary from '../components/ErrorBoundary'
import Popups from '../components/Popups'
import Sidebar, { useSidebarState } from '../components/Sidebar/Sidebar'
import { Paths } from '../constants/paths'
import { useActiveWeb3React } from '../hooks/web3'
import Home from './Home/Home'
import NotFound from './NotFound/NotFound'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  height: 100%;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  z-index: 1;
  width: 100%;
  padding: 70px 0 0 0;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    padding: 70px 0 0 0;
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 70px 0 0 0;
  `};
  ${({ theme }) => theme.mediaWidth.upToTablet`
    padding: 0 0 0 0;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 13px 0 0 0;
  `};

  .pro-sidebar {
    max-width: 280px;
    min-width: 280px;
    position: sticky;
    height: calc(100% - 70px);
    max-height: 100vh;

    ${({ theme }) => theme.mediaWidth.upToExtraLarge`
      max-width: 280px;
      min-width: 280px;
    `};

    ${({ theme }) => theme.mediaWidth.upToLarge`
      max-width: 250px;
      min-width: 250px;
    `};

    ${({ theme }) => theme.mediaWidth.upToMedium`
      max-width: 200px;
      min-width: 200px;
    `};

    ${({ theme }) => theme.mediaWidth.upToSmall`
      max-width: 200px;
      min-width: 200px;
    `};

    ${({ theme }) => theme.mediaWidth.upToTablet`
      max-width: 200px;
      min-width: 200px;
    `};
  }
  .pro-sidebar-footer {
    position: fixed;
    bottom: 25px;
    width: 250px;

    ${({ theme }) => theme.mediaWidth.upToExtraLarge`
      width: 250px;
    `};

    ${({ theme }) => theme.mediaWidth.upToLarge`
      width: 250px;
    `};

    ${({ theme }) => theme.mediaWidth.upToMedium`
      width: 170px;
      min-width: 170px;
    `};

    ${({ theme }) => theme.mediaWidth.upToTablet`
      width: 170px;
      min-width: 170px;
    `};

    ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 170px;
    min-width: 170px;
    `};

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
    `};

    @media (max-height: 800px) {
      bottom: 5px;
    }
  }
`

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 25px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToPhone`
    padding: 16px 10px;
    margin-bottom: 30px;
  `};
`

export default function App() {
  return (
    <ErrorBoundary>
      <AppWrapper>
        <Content />
      </AppWrapper>
    </ErrorBoundary>
  )
}

const Content = () => {
  const { open, onToggle } = useSidebarState()
  const isMobileDevice = useIsMobileDevice()

  const { chainId } = useActiveWeb3React()

  return (
    <>
      <Popups />
      <Header />
      <WarningWrapper>
        <>
          <BodyWrapper>
            {!isMobileDevice && <Sidebar onToggle={onToggle} open={open} />}
            <ContentWrapper>
              <Box position="relative" width="100%" flex={1}>
                {chainId && <AppRoutes />}
              </Box>
              <Polling />
            </ContentWrapper>
          </BodyWrapper>
        </>
      </WarningWrapper>

      <UniwalletModal />

      <Footer />
    </>
  )
}

const Footer = () => {
  return <></>
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="*" element={<Navigate to="/not-found" replace />} />
        <Route path={Paths.HOME} element={<Home />} />
        <Route path={Paths.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
