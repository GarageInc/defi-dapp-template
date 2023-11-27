import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material'
import styled from 'styled-components'

export const Container = styled(Breadcrumbs)`
  align-self: flex-start;
  margin-bottom: 25px;

  li,
  p,
  a {
    font-family: Uniform Pro;
    font-size: 16px;
  }

  .MuiBreadcrumbs-separator {
    color: ${({ theme }) => theme.slightlyDesaturatedBlue};
  }
`

export const Link = styled(MuiLink)`
  color: ${({ theme }) => theme.slightlyDesaturatedBlue};
  font-size: 16px;
`

export const CurrentLink = styled(Typography)`
  font-size: 16px;
  color: ${({ theme }) => theme.text5};
`
