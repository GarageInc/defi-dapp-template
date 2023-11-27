import { Flex } from 'rebass/styled-components'
import styled from 'styled-components'

export const ShadowCard = styled(Flex).attrs({
  flexDirection: 'column',
})`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`
