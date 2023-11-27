import { useIsMobileDevice } from 'components/blocks/Header'
import { useRouteNavigator } from 'components/blocks/RouteNavigator/useRouteNavigator'
import { SupportedChainId } from 'constants/chainsinfo'
import { useActiveWeb3React } from 'hooks/web3'

import { Container, CurrentLink, Link } from './styles'

const RouteNavigator = () => {
  const { links } = useRouteNavigator()
  const { chainId } = useActiveWeb3React()
  const isMobileDevice = useIsMobileDevice()

  if (isMobileDevice || chainId != SupportedChainId.ARBITRUM_ONE || links.length === 0) {
    return null
  }

  return (
    <Container aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        <>Home</>
      </Link>

      {links.map(({ link, label }, index) => {
        if (index === links.length - 1) {
          return (
            <CurrentLink key={label}>
              <>{label}</>
            </CurrentLink>
          )
        }
        return (
          <Link key={label} underline="hover" color="inherit" href={link}>
            <>{label}</>
          </Link>
        )
      })}
    </Container>
  )
}

export default RouteNavigator
