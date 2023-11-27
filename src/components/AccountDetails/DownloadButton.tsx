import { PropsWithChildren, useCallback } from 'react'
import styled from 'styled-components'
import { ClickableStyle } from 'theme/components'
import { openDownloadApp } from 'utils/openDownloadApp'

const StyledButton = styled.button<{ padded?: boolean; branded?: boolean }>`
  ${ClickableStyle}
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 6px;
  padding: 8px 24px;
  border: none;
  white-space: nowrap;
  border-radius: 12px;

  font-weight: 535;
  font-size: 14px;
  line-height: 16px;
`

function BaseButton({ onClick, branded, children }: PropsWithChildren<{ onClick?: () => void; branded?: boolean }>) {
  return (
    <StyledButton branded={branded} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

// Launches App Store if on an iOS device, else navigates to Uniswap Wallet microsite
export function DownloadButton({ onClick, text = 'Download' }: { onClick?: () => void; text?: string }) {
  const onButtonClick = useCallback(() => {
    // handles any actions required by the parent, i.e. cancelling wallet connection attempt or dismissing an ad
    onClick?.()
    openDownloadApp()
  }, [onClick])

  return (
    <BaseButton branded onClick={onButtonClick}>
      {text}
    </BaseButton>
  )
}
