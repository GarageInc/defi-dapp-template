import './sidebar.scss'

import React, { useCallback, useEffect, useState } from 'react'
import { ProSidebar, SidebarContent, SidebarFooter } from 'react-pro-sidebar'
import styled from 'styled-components'

import { Paths } from '../../constants/paths'
import { activeClassName, StyledNavLink } from '../NavigationTabs'

const StyledMenuLinkFarm = styled(StyledNavLink).attrs({
  activeClassName,
})`
  opacity: ${({ inactive = false }) => (inactive ? '0.4' : '1')};
  pointer-events: ${({ inactive = false }) => (inactive ? 'none' : 'initial')};
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 15px;
  align-items: center;
  color: ${({ theme }) => theme.white};

  font-weight: bold;
  transition: all 0.3s;

  :hover {
    transform: translateX(10px);
    color: #f56738;
    transition: all 0.3s;
  }

  :active {
    color: #f56738;
    text-decoration: none;
    transition: all 0.3s;
  }

  &.${activeClassName} {
    font-weight: bold;
    transition: all 0.3s;
    span {
      background: #f56738;
      box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.25);
      border-radius: 0px 12px 12px 0px;
      min-width: 75px;
      margin-left: 0px;
      justify-content: flex-end;
    }
    :hover {
      transform: translateX(0px);
      color: ${({ theme }) => theme.white};
      transition: all 0.3s;
    }
    :focus {
      transition: all 0.3s;
      color: ${({ theme }) => theme.white};
    }
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    &.${activeClassName} {
      span {
        min-width: 65px;
      }
    }
    :hover {
      transform: translateX(5px);
      color: #f56738;
    }
  `};

  margin: 18px 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.75px;
  height: 70px;

  ${({ theme }) => theme.mediaWidth.upToExtraLarge`
    margin: 10px 0;
    font-size: 22px;
    line-height: 26px;
    height: 50px;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin: 6px 0;
    font-size: 18px;
    line-height: 22px;
    height: 50px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 6px 0;
    grid-column-gap: 15px;
    font-size: 15px;
    line-height: 23px;
    height: 40px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin: 6px 0;
    grid-column-gap: 15px;
    font-size: 15px;
    line-height: 23px;
    height: 40px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
  margin: 8px 0;
  grid-column-gap: 15px;
  font-size: 15px;
  line-height: 23px;
  height: 40px;
  `};

  @media (max-height: 800px) {
    height: 56px;
    margin: 2px 0;

    span {
      min-width: 32px;
      padding: 0;
    }

    &.${activeClassName} {
      span {
        min-width: 57px !important;
        padding-right: 8px;
      }
    }
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0px;
  }
`

const StyledMenuLinkBattle = styled(StyledMenuLinkFarm)`
  transition: all 0.3s ease-in;
  :hover {
    transform: translateX(10px);
    color: #f64562;
  }
  &.${activeClassName} {
    span {
      background: #f64562;
      box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.25);
      border-radius: 0px 12px 12px 0px;
      min-width: 75px;
      margin-left: 0px;
      justify-content: flex-end;
    }
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    &.${activeClassName} {
      span {
        min-width: 65px;
      }
    }
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    :hover {
      transform: translateX(5px);
      color: #f64562;
    }
  `};
`

const StyledMenuLinkYieldBottom = styled(StyledMenuLinkFarm)`
  transition: all 0.3s ease-in;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    &.${activeClassName} {
      span {
        min-width: 65px;
      }
    }
  `};
  :hover {
    color: #1fad1f;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    :hover {
      transform: translateX(5px);
      color: #1fad1f;
    }
  `};
`

const Btn = styled.span`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.grey};
  padding: 15px 15px;
  min-width: 60px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  font-family: 'Font Awesome 6 Pro';
  font-weight: bold;
  font-size: 25px;

  min-width: 50px;
  font-size: 20px;
  border-radius: 10px;
  padding: 14px 14px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    min-width: 40px;
    font-size: 16px;
    padding: 8px;
    border-radius: 8px;
  `};

  svg {import { disableList } from '../../state/lists/actions';

    height: 38px;
    width: 38px;

    ${({ theme }) => theme.mediaWidth.upToExtraLarge`
      height: 38px;
      width: 38px;
    `};

    ${({ theme }) => theme.mediaWidth.upToLarge`
      height: 24px;
      width: 24px;
    `};

    ${({ theme }) => theme.mediaWidth.upToMedium`
      height: 22px;
      width: 22px;
    `};

    ${({ theme }) => theme.mediaWidth.upToTablet`
      height: 20px;
      width: 20px;
    `};

    ${({ theme }) => theme.mediaWidth.upToSmall`
      height: 20px;
      width: 20px;
    `};
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    overflow: hidden;
    z-index: 100;
  `};

  @media (max-height: 800px) {
    margin-top: 8px;
  }
`

// https://github.com/azouaoui-med/react-pro-sidebar/blob/master/src/scss/variables.scss
const mql = window.matchMedia(`(min-width: 1024px)`)

export const useSidebarState = () => {
  const [open, setOpen] = useState(false)
  const [docked, setDocked] = useState(() => mql.matches)

  const onToggle = (value: boolean) => setOpen(value)
  const onOpen = () => setOpen(true)

  const mediaQueryChanged = useCallback(() => {
    setDocked(mql.matches)
    setOpen(false)
  }, [setDocked, setOpen])

  useEffect(() => {
    mql.addListener(mediaQueryChanged)

    return () => mql.removeListener(mediaQueryChanged)
  }, [mediaQueryChanged])

  return { open, onToggle, onOpen, docked }
}

interface IProps {
  onToggle: (b: boolean) => void
  open: boolean
}

const BattlesSidebar = () => {
  return (
    <>
      <SidebarContent>
        <Content>
          <StyledMenuLinkBattle to={Paths.HOME}>
            <Btn>&nbsp;&nbsp;</Btn>
            <>Home</>
          </StyledMenuLinkBattle>
        </Content>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </>
  )
}

const SidebarInner = ({ open, onToggle }: IProps) => {
  return (
    <>
      <ProSidebar toggled={open} onToggle={onToggle}>
        <BattlesSidebar />
      </ProSidebar>
    </>
  )
}

export default SidebarInner
